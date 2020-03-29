import domready from 'domready'

domready(() => {
  const $button = document.createElement("button");
  $button.innerText = 'Open all';
  $button.className = 'btn btn-sm mr-1';

  const handleLink = (el: HTMLAnchorElement) => {
    window.open(el.href);
  }

  const $classicHeader = document.querySelector('#notification-center');
  const $header = document.querySelector(".js-notifications-list .Box-header");

  if ($classicHeader) {
    $button.addEventListener('click', (e) => {
      e.preventDefault();
      document
        .querySelectorAll<HTMLAnchorElement>(
          ".notifications-list a.js-navigation-open"
        )
        .forEach(handleLink);
    });
    const $headerRightBox = $classicHeader.querySelector('.tabnav .float-right');
    if ($headerRightBox) {
      $headerRightBox.insertBefore($button, $headerRightBox.firstChild);
    }
  } else if ($header) {
    $button.style.marginLeft = 'auto';
    $button.addEventListener('click', (e) => {
      e.preventDefault();
      document
        .querySelectorAll<HTMLAnchorElement>(
          ".js-notifications-list a.js-navigation-open"
        )
        .forEach(handleLink);
    });
    $header.appendChild($button);
  }
});
