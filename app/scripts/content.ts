import domready from "domready";

domready(() => {
  const handleLink = (el: HTMLAnchorElement) => window.open(el.href);
  const $classicUIContainer = document.querySelector("#js-pjax-container");
  const $modernUIContainer = document.querySelector("#js-repo-pjax-container");

  if ($classicUIContainer) {
    const observeFunc = function () {
      this.disconnect && this.disconnect();

      // Classic UI
      if (!document.querySelector("#ext-open-all-open-all")) {
        console.log("Show for Classic UI");
        const $openAllButton = document.createElement("button");
        $openAllButton.id = "ext-open-all-open-all";
        $openAllButton.innerText = "Open all";
        $openAllButton.className = "btn btn-sm mr-1";
        $openAllButton.addEventListener("click", (e) => {
          e.preventDefault();
          document
            .querySelectorAll<HTMLAnchorElement>(
              ".notifications-list a.js-navigation-open"
            )
            .forEach(handleLink);
        });
        const $headerRightBox = document.querySelector(
          "#notification-center .tabnav .float-right"
        );
        if ($headerRightBox) {
          $headerRightBox.insertBefore(
            $openAllButton,
            $headerRightBox.firstChild
          );
        }
      }

      this.observe && this.observe($classicUIContainer, { childList: true, subtree: true });
    }

    const observer = new MutationObserver(observeFunc)
    observeFunc.call(observer)
  } else if ($modernUIContainer) {
    const observeFunc = (function () {
      this.disconnect && this.disconnect();

      const $modernUI = document.querySelector(
        ".js-notifications-list .Box-header"
      );
      if ($modernUI) {
        // Modern UI (beta)
        const buttonID = "ext-open-all-btn";
        if (!document.querySelector(`#${buttonID}`)) {
          const $openAllButton = document.createElement("button");
          $openAllButton.id = buttonID;
          $openAllButton.innerText = "Open all";
          $openAllButton.className = "btn btn-sm mr-1";
          $openAllButton.style.marginLeft = "auto";
          $openAllButton.addEventListener("click", (e) => {
            e.preventDefault();
            document
              .querySelectorAll<HTMLAnchorElement>(
                ".js-notifications-list a.js-navigation-open"
              )
              .forEach(handleLink);
          });
          $modernUI.appendChild($openAllButton);
        }

        // Open selected
        const $bulkActionContainer = $modernUI.querySelector(
          ".js-notifications-mark-selected-actions"
        );
        if ($bulkActionContainer) {
          const buttonID = "ext-open-selected-btn";
          if (!document.querySelector(`#${buttonID}`)) {
            const $openSelectedButton = document.createElement("button");
            $openSelectedButton.id = buttonID;
            $openSelectedButton.innerText = "Open selected";
            $openSelectedButton.className = "btn btn-sm mr-1";
            $openSelectedButton.addEventListener("click", (e) => {
              e.preventDefault();
              document
                .querySelectorAll<HTMLDivElement>(
                  ".js-notifications-list .notifications-list-item"
                )
                .forEach((el) => {
                  if (
                    el.querySelector(
                      "input[name='notification_ids[]'][type='checkbox']:checked"
                    )
                  ) {
                    el.querySelectorAll("a.js-navigation-open").forEach(
                      handleLink
                    );
                  }
                });
            });
            $bulkActionContainer.insertBefore(
              $openSelectedButton,
              $bulkActionContainer.firstChild
            );
          }
        }
      }
      this.observe && this.observe($modernUIContainer, { childList: true, subtree: true });
    })
    const observer = new MutationObserver(observeFunc);
    observeFunc.call(observer);
  }
});
