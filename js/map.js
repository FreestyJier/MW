ymaps.ready(init);

var placemarks = [
    {
      latitude: 51.602187,
      longitude: 39.263618,
      hintContent: '<div class="map__hint">ул. Чебышева, д. 34з</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__mwlogo-img" src="img/MWlogo.png" alt="Металлверк"/>',
        "Изготовление металлоконструкций.<br> Адрес:<br> ул. Чебышева, д. 34з",
        "</div>",
      ],
    },
  ],
  geoObjects = [];

function init() {
  var map = new ymaps.Map("map", {
    center: [51.602187, 39.263618],
    zoom: 16,
    controls: ["zoomControl"],
    //  behaviors: ["drag"],
  });

  for (var i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark(
      [placemarks[i].latitude, placemarks[i].longitude],
      {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent.join(""),
      },
      {
        iconLayout: "default#image",
        iconImageHref: "img/mapmarker.png",
        iconImageSize: [50, 50],
        iconImageOffset: [-33, -77],
        //   iconImageClipRect: [
        //     [415, 0],
        //     [461, 57],
        //   ],
      }
    );
  }

  var clusterer = new ymaps.Clusterer({
    clusterIcons: [
      {
        href: "img/MWlogo.png",
        size: [100, 100],
        offset: [-50, -50],
      },
    ],
    clusterIconContentLayout: null,
  });

  map.geoObjects.add(clusterer);
  clusterer.add(geoObjects);

  objectManager.objects.events.add(["mouseenter", "mouseleave"], onObjectEvent);
  objectManager.clusters.events.add(
    ["mouseenter", "mouseleave"],
    onClusterEvent
  );
}
