(function ($, Drupal, drupalSettings, cookies) {

  //'use strict';
  Drupal.behaviors.custom_gtm = {
    attach: function (context) {

      if($('body', context).length && typeof dataLayer !== 'undefined') 
      {
        var cookie = cookies.get('Drupal.visitor.custom_gtm');
        
        if (typeof cookie !== "undefined") 
        {
          var cookieObj = JSON.parse(cookie);

          if (cookieObj.id === "contatti") {
            dataLayer.push({
              'event': 'submit_contact_form',
              'contact_reason': cookieObj.contact_reason,
              'customer_type': cookieObj.customer_type,
              'product_type': cookieObj.product_type
            });
          }
          
          if (cookieObj.id === "configurator") {
            dataLayer.push({
              'event': 'submit_contact_form',
            });
          }

          cookies.remove('Drupal.visitor.custom_gtm');
        }

        // pagina download
        $(".gtm-shop-download a", context).click(function (e) {

            //var fileName = ($(this).attr("filename")).replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
            var productTitle = $('.gtm-product-title').text();

            var fileUrl = $(this).attr("href");
            var fileUrlSplit = fileUrl.split('/');
            var splitCount = fileUrlSplit.length;

            dataLayer.push({
                'event': 'GAEvent',
                'eventCategory': 'Download',
                'eventAction': productTitle,
                'eventLabel': fileUrlSplit[splitCount-1]
            });
        });

        // primary menu
        document.querySelectorAll('.menu--primary li').forEach(el => {
          el.addEventListener('click', event => {
            window.dataLayer.push({
              event: "click_main_menu_item",
              menu_item_name: `${el.firstElementChild.innerHTML}`
          });
          })
        })

        //  submenu
        document.querySelectorAll('.submenu li').forEach(el => {
          el.addEventListener('click', event => {
            window.dataLayer.push({
              event: "click_secondary_menu_item",
              menu_item_name: `${el.querySelector('a').innerHTML}`
            });
          });
        });

        //  work-with-us
        document.querySelectorAll('.work-list__item .cta a').forEach(el => {
          el.addEventListener('click', event => {
            window.dataLayer.push({
              event: "select_vacancy",
              vacancy_type: `${el.closest('.work-list__item').querySelector('.title .h4--bold').innerHTML}`
            });
          });
        });
        document.querySelectorAll('.section-work .applicate').forEach(el => {
          el.addEventListener('click', event => {
            window.dataLayer.push({
              event: "click_application_form",
              vacancy_type: `${el.closest('#main-content').querySelector('.hero-page-mini__inner-title.h1').innerHTML}`
            });
          });
        });

        //  professional-area
        document.querySelectorAll('.slider a').forEach(el => {
          el.addEventListener('click', event => {
            window.dataLayer.push({
              event: "click_download_category",
              download_category: `${el.closest('.slider__wrapper-content').querySelector('.title.h3--bold').innerHTML}`
            });
          });
        });

        //  documentation download
        document.querySelectorAll('.block-documentation__list-item li a').forEach(el => {
          el.addEventListener('click', event => {
            window.dataLayer.push({
              event: "download",
              file_name: `${el.href.substring(el.href.lastIndexOf('/') + 1)}`,
              file_extension: `${el.querySelector('.info .label--blue').innerHTML}`,
              file_category: `${document.querySelector('.block-documentation__chips-item.active a').childNodes[0].textContent.trim()}`
            });
          });
        });

        //  faqs
        document.querySelectorAll('.menu-grid a').forEach(el => {
          el.addEventListener('click', event => {
            window.dataLayer.push({
              event: "select_faq_category",
              category_name: `${el.querySelector('.menu-grid__item-label').innerHTML}`,
            });
          });
        });
      }
    }
  }
})(jQuery, Drupal, drupalSettings, window.Cookies);
