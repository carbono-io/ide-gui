(function () {

  var headerLeft = document.getElementById('header-left');
  var headerPanel = document.getElementById('carbo-header-panel');


  var headerPanelStatus = 'inactive';

  headerLeft.addEventListener('click', function () {

    if (headerPanelStatus === 'inactive') {
      headerPanelStatus = 'active';
      headerPanel.className = 'active';
    } else {
      headerPanelStatus = 'inactive';
      headerPanel.className = '';
    }

  });


})();