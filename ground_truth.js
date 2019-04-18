// //6+1 cities
// var lcz=ee.FeatureCollection('ft:1OeKepgz5wzjdMNaN3dO2NiE-9hg0aqnFRM2V9xbx') ;//Ams
// var lcz=ee.FeatureCollection('ft:1V6UfMCjEaYvd6yFhf0wtR4xW1idOmGjIrSDTnBga') ;//Ber
// var lcz=ee.FeatureCollection('ft:1b2JIK6TUWR053nux0XC4ADIu7-a9fcO2pUpBMfkE') ;//Col
// var lcz=ee.FeatureCollection('ft:1o3wSfVKw8FZucH4IKRxeRyjxUM3L_ir5wj0NmOa6') ;//Lon
// var lcz=ee.FeatureCollection('ft:1gu-z_aJm2yVqgQU6ji33jOxWvW74GrBVBYD2v65t') ;//Mil
// var lcz=ee.FeatureCollection('ft:1V0T-cEUVjUQGx6V87iji1by0r4te6VJdPYjB2bqT') ;//Mun
// var lcz=ee.FeatureCollection('ft:1vIrNARUtG2f9vtj0KAY4fBtOJodMr542CxQZMth0') ;//Par
// var lcz=ee.FeatureCollection('ft:1Wa4qsC7qhh8SUri3vIZRnIWiqFcMJnlbYrCjKtKI') ;//Ro
 var lcz=ee.FeatureCollection('ft:1-MmlhTXVzosJhw1I_Zoi8MDuEv6FJrLRfR_1W3qc') ;//Zu
///////////////
lcz = lcz.filter( ee.Filter.eq('class', 17)).merge(
  lcz.filter( ee.Filter.neq('class', 17)).map(function (feature){return ee.Feature(feature.geometry().buffer(-50)).set({class: feature.get('class')}) })
  );
var lcz0 = lcz.filter(ee.Filter.and(ee.Filter.gt('class', 0), ee.Filter.lt('class', 11))) ;
lcz0 = lcz0.merge( lcz.filter(ee.Filter.eq('class', 15)) ).map(function (x){return x.set({class: 0})})  ;
var lcz6 = lcz.filter(ee.Filter.and(
  ee.Filter.neq('class', 15),
  ee.Filter.gt('class', 10),
  ee.Filter.lt('class', 18) )) ;
lcz = lcz0.merge(lcz6) ;
lcz=lcz.remap([0, 11, 12, 13, 14, 16, 17], [0,1,2,3,4,5,6], 'class')
//////////
// lcz = lcz.filter( ee.Filter.eq('class', 17)).merge(
//   lcz.filter( ee.Filter.neq('class', 17)).map(function (feature){return ee.Feature(feature.geometry().buffer(-50)).set({class: feature.get('class')}) })
//   );
// //print(lcz.size())

// //print(lcz)
// // This function computes the feature's geometry area and adds it as a property.
// var addArea = function(feature) {
//   return feature.set({areaHa: ee.Number(feature.geometry().area().divide(100 * 100)).abs()});
// };

// lcz = lcz.map(addArea).sort('areaHa')
// //print(lcz)

// /**********************functions*****************************************/
// var iterate_poly2points_1 = function(feat, list) {
//   var poly2points = function(feature) {
//     //for each 100*100 area, get one point
//     // Генерирует равномерно распределенные точки, геометрия - в пределах какого региона, номер - число точек
//   var points = ee.FeatureCollection.randomPoints(ee.Geometry(feature.geometry()), ee.Number(feature.get('areaHa')).round())
//   // К каждой точке добавляем название ее класса
//   return points.map(function(x) {return x.set({class: feature.get('class')})} ) ;
// };
//   return ee.FeatureCollection(list).merge(poly2points(feat)) ;
// };

// var iterate_poly2points_2 = function(feat, list) {
//   var poly2points = function(feature) {
//     //for two 100*100 area, get one point
//     // Т.е. число точек в два раза меньше
//   var points = ee.FeatureCollection.randomPoints(ee.Geometry(feature.geometry()), ee.Number(feature.get('areaHa')).divide(2).round())
//   return points.map(function(x) {return x.set({class: feature.get('class')})} ) ;
// };
//   return ee.FeatureCollection(list).merge(poly2points(feat)) ;
// };
// var iterate_poly2points_3 = function(feat, list) {
//   var poly2points = function(feature) {
//     //for five 100*100 area, get one point
//     // Т.е. число точек в пять раз меньше
//   var points = ee.FeatureCollection.randomPoints(ee.Geometry(feature.geometry()), ee.Number(feature.get('areaHa')).divide(5).round())
//   return points.map(function(x) {return x.set({class: feature.get('class')})} ) ;
// };
//   return ee.FeatureCollection(list).merge(poly2points(feat)) ;
// };
// var first = ee.FeatureCollection([]) ;
// // Since the return type of iterate is unknown, it needs to be cast
// var samples = ee.FeatureCollection((lcz.iterate(iterate_poly2points_2, first))) ;
// //print(samples.size())
// samples=samples.sort('system:index').randomColumn('random');

// //lcz 1-10 are combined as one class
// var lcz0 = samples.filter(ee.Filter.and(ee.Filter.gt('class', 0), ee.Filter.lt('class', 11))) ;
// //redefine the lcz: consider the lcz 15 as 'urban'
// lcz0 = lcz0.merge( samples.filter(ee.Filter.eq('class', 15)) ).map(function (x){return x.set({class: 0})})  ;

// var lcz6 = samples.filter(ee.Filter.and(
//   ee.Filter.neq('class', 15),
//   ee.Filter.gt('class', 10),
//   ee.Filter.lt('class', 18) )) ;

// samples = lcz0.merge(lcz6) ;
// //give the precessed classes a new label
// samples=samples.remap([0, 11, 12, 13, 14, 16, 17], [0,1,2,3,4,5,6], 'class').sort('class')
// print(samples.size())

var palette = [
'85060A',
'026805',
'00AB05',
'608726',
'B9DC7E',
'F9F8A8',
'6E6BFE'
];

var features = lcz.map(function(f) {
  var klass = f.get("class")
  return ee.Feature(f.set({style: {color: ee.List(palette).get(klass)}}))
})
Map.centerObject(lcz)
Map.addLayer(features.style({styleProperty: "style"}))

// Legend
var legend = ui.Panel({
  style: {
    position: 'top-left',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'Classes',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);

var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var names = ['Urban','Dense trees','Scattered trees', 'Bush, scrub','Low plants','Bare soil or sand','Water'];
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
  var img = features.style({styleProperty: "style"})
Map.addLayer(features.style({styleProperty: "style"}))
Map.add(legend);

// var ROI=ee.FeatureCollection('ft:1Fk0SYlZu-MoAsCK5V14eoWWnWdg0qrb8Mvwtwg5j') ;//Amsterdam_roi
// var ROI=ee.FeatureCollection('ft:1Uyb6Pbaskp6X5xr4FVCs_Q0KlVXAex7BJChrMcMY') ;//Berlin_roi
// var ROI=ee.FeatureCollection('ft:1eBzXp5sMzOnQdxrB1uOoJoo9PMKK9ZRJqIlvrqcq') ;//Cologne_roi
// var ROI=ee.FeatureCollection('ft:12ERapKaci2dc36NH78W3QqWksVWWMCirkOi3gJoJ') ;//London_roi
// var ROI=ee.FeatureCollection('ft:1NETO59ScsBmPdSAHvLuJHgP9UveHDWMVZeMb3yxC') ;//Milan_roi
// var ROI=ee.FeatureCollection('ft:1bTmjrH4z5p0N4c9i21IrjudlwcK2J1m3qh8cJ0Eh') ;//Munich_roi
// var ROI=ee.FeatureCollection('ft:1UNke9-aO2NzUbVDWrJr1Z6GXgRpUPvGcI0DsilQn') ;//Paris_roi
// var ROI=ee.FeatureCollection('ft:1R10vnaR0iwrxH5ovkw5zzO3E0dGl-6-Yh72vhLTY') ;//Rome roi
 var ROI=ee.FeatureCollection('ft:1mdN_Rd-iEZy0RwJsgZn4wkaO9vpfH51uS-x_hI4V') ;//Zurich_roi
var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[6.709, 50.892],
          [7.0184, 50.892],
          [7.0184, 50.99],
          [6.709, 50.99]]]);


Export.image.toDrive({
  image: img,
  description: 'Zurich_gt',
  scale: 30,
  region: ROI
});
