document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  $(function() {
    var $mainNav = $(".main-nav");
    var $headerSearch = $(".header-search");

    if (window.matchMedia("(min-width: 768px)").matches) {
      $headerSearch.innerWidth($mainNav.innerWidth() + 100);
    }
  });

  $('.user-nav__link').on('click', function(event) {
    event.preventDefault();
    var $item = $(this).closest('.user-nav__item');
    var $dropdown = $item.find('.user-nav__dropdown');
    $dropdown.addClass('user-nav__dropdown--opened');

    function handlerDocumentClick(event) {
      var target = event.target;

      if ($(target).closest($dropdown).length) {
        return;
      }
      $dropdown.removeClass('user-nav__dropdown--opened');
      $(document).off('mousedown', handlerDocumentClick);
    }

    $(document).on('mousedown', handlerDocumentClick);
  });

  window.catalogNav = (function() {
    "use strict";
    console.log("catalog-nav");

    var catalogNav = document.querySelector(".catalog-nav");
    var catalogNavToggle = catalogNav.querySelector(".catalog-nav__toggle");
    var catalogNavItems = catalogNav.querySelectorAll(".catalog-nav__item");
    var catalogNavLinks = catalogNav.querySelectorAll(".catalog-nav__link");

    catalogNav.classList.remove("catalog-nav--no-js");

    catalogNavToggle.addEventListener('click', function (event) {
      event.preventDefault();
      if (catalogNav.classList.contains('catalog-nav--opened')) {
        catalogNav.classList.remove('catalog-nav--opened');
      } else {
        catalogNav.classList.add('catalog-nav--opened');
      }
    });

    function closedSidebarCatalogItems(excludeItem) {
      for (var i = 0; i < catalogNavItems.length; i++) {
        if (catalogNavItems[i] !== excludeItem) {
          catalogNavItems[i].classList.remove("catalog-nav__item--opened");
        }
      }
    }

    for (var i = 0; i < catalogNavLinks.length; i++) {
      catalogNavLinks[i].addEventListener("click", function(event) {
        var target = event.target;
        var item = target.parentElement;

        // closedSidebarCatalogItems(item);

        if (item.classList.contains("catalog-nav__item--opened")) {
          item.classList.remove("catalog-nav__item--opened");
        } else {
          item.classList.add("catalog-nav__item--opened");
        }
      });
    }
  })();

  function movedLine({
    containerSelector,
    itemSelector,
    lineSelector
  }) {
    const container = document.querySelector(containerSelector);
    const items = document.querySelectorAll(itemSelector);
    const line = document.querySelector(lineSelector);

    let containerWidth = container.offsetWidth;
    let currentItem = null;

    function setLinePosition(item) {
      let itemLeft = item.offsetLeft;
      let itemWidth = item.offsetWidth;

      line.style.left = `${itemLeft}px`;
      line.style.width = `${itemWidth}px`;
      line.style.height = '';
    }

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      const itemClass = itemSelector.slice(1);

      if (item.classList.contains(`${itemClass}--active`)) {
        currentItem = item;
        setLinePosition(currentItem);
      }

      item.addEventListener("mouseenter", function(event) {
        setLinePosition(event.target);
      });
    }

    container.addEventListener("mouseleave", function(event) {
      if (!currentItem) {
        line.style.height = 0;
        return;
      }
      setLinePosition(currentItem);
    });
  }

  movedLine({
    containerSelector: ".main-nav__list",
    itemSelector: ".main-nav__item",
    lineSelector: ".main-nav__slide-line"
  });

  movedLine({
    containerSelector: '.pagination__list',
    itemSelector: '.pagination__item',
    lineSelector: '.pagination__slide-line'
  });

});
