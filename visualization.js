var dt = require('users/fitoprincipe/geetools:decision_tree');

// var ROI=ee.FeatureCollection('ft:1Fk0SYlZu-MoAsCK5V14eoWWnWdg0qrb8Mvwtwg5j') ;//Amsterdam_roi
// var ROI=ee.FeatureCollection('ft:1Uyb6Pbaskp6X5xr4FVCs_Q0KlVXAex7BJChrMcMY') ;//Berlin_roi
 var ROI=ee.FeatureCollection('ft:1eBzXp5sMzOnQdxrB1uOoJoo9PMKK9ZRJqIlvrqcq') ;//Cologne_roi
// var ROI=ee.FeatureCollection('ft:12ERapKaci2dc36NH78W3QqWksVWWMCirkOi3gJoJ') ;//London_roi
// var ROI=ee.FeatureCollection('ft:1NETO59ScsBmPdSAHvLuJHgP9UveHDWMVZeMb3yxC') ;//Milan_roi
// var ROI=ee.FeatureCollection('ft:1bTmjrH4z5p0N4c9i21IrjudlwcK2J1m3qh8cJ0Eh') ;//Munich_roi
// var ROI=ee.FeatureCollection('ft:1UNke9-aO2NzUbVDWrJr1Z6GXgRpUPvGcI0DsilQn') ;//Paris_roi
// var ROI=ee.FeatureCollection('ft:1R10vnaR0iwrxH5ovkw5zzO3E0dGl-6-Yh72vhLTY') ;//Rome roi
// var ROI=ee.FeatureCollection('ft:1mdN_Rd-iEZy0RwJsgZn4wkaO9vpfH51uS-x_hI4V') ;//Zurich_roi
// var ROI = ee.FeatureCollection('ft:1vhzh6RUFHNtQS9nV0Xh4Mz62uu2P0xoiheBstF37');//Moscow_ro
//var ROI = ee.FeatureCollection('ft:1yOYcVVUsb3NaNzGA3s56gi8IpUWm3Ye2XxDo6uw9');//Lisbon_roi
// var ROI = ee.FeatureCollection('ft:1A7KEPm61UnQ2YAoJqPJA6qWY-ctffG7Oc-2YI57-');//Madrid_roi

var bands = [ 'B2', 'B3', 'B4',  'B8', 'B8A', 'B11', 'B12', 'B1',  'B9', 'B10'];
var year= 2017;

//The whole year classification
var start = ee.Date.fromYMD(year,6,1)
var end = start.advance(3,'month')

function cloudMask(image){
var img = ee.Image(image).divide(10000);
var B1 = img.select('B1'), B2 = img.select('B2'), B3 = img.select('B3');
var B5 = img.select('B5'), B6 = img.select('B6'), B7 = img.select('B7');
var B9 = img.select('B9'), B10 = img.select('B10'), B11 = img.select('B11');
var img_mod = img.addBands(B5.divide(B11).rename('R_5_11')).addBands(B2.divide(B10).rename('R_2_10')).
addBands(B2.divide(B9).rename('R_2_9')).addBands(B1.divide(B5).rename('R_1_5')).
addBands(B3.subtract(B7).rename('S_3_7')).addBands(B11.subtract(B10).rename('S_11_10')).
addBands(B9.subtract(B11).rename('S_9_11')).addBands(B6.subtract(B7).rename('S_6_7'));
var c1 = img_mod.select('B3').lt(0.319);
var c2 = img_mod.select('B8A').lt(0.166);
var c3 = img_mod.select('R_5_11').lt(4.330);
var c4 = img_mod.select('S_3_7').lt(0.027);
var c5 = img_mod.select('R_2_10').lt(14.689);
var c6 = img_mod.select('S_11_10').lt(0.255);
var c7 = img_mod.select('B3').lt(0.525);
var c8 = img_mod.select('S_9_11').lt(-0.097);
var c9 = img_mod.select('S_9_11').lt(0.021);
var c10 = img_mod.select('R_2_9').lt(0.788);
var c11 = img_mod.select('S_6_7').lt(-0.016);
var c12 = img_mod.select('B1').lt(0.300);
var c13 = img_mod.select('R_1_5').lt(1.184);
var conditions = {1:c1, 2:c2, 3:c3, 4:c4, 5:c5, 6:c6, 7:c7, 8:c8, 9:c9, 10:c10, 11:c11, 12:c12, 13:c13};
var classes = {'class1-1':[[1,1],[2,1],[4,1],[8,1]],
              'class1-2': [[1,1],[2,0],[5,1],[10,1]],
              'class1-3': [[1,1],[2,0],[5,0]],
              'class1-4': [[1,0],[3,1],[6,0],[12,1]],
              'class1-5': [[1,0],[3,0],[7,1],[13,1]],
              'class1-7': [[1,1],[2,1],[4,1],[8,0]],//shadow
              'class1-8': [[1,1],[2,1],[4,0],[9,0]],//shadow
              'class1-9': [[1,0],[3,0],[7,1],[13,0]],//shadow
              'class1-6': [[1,1],[2,1],[4,0],[9,1]],//water
              'class4-1': [[1,1],[2,0],[5,1],[10,0]],
              'class4-2': [[1,0],[3,1],[6,1],[11,0]],
              'class5-1': [[1,0],[3,1],[6,1],[11,1]],
              'class5-2': [[1,0],[3,1],[6,0],[12,0]],
              'class1-10': [[1,0],[3,0],[7,0]]//snow
  }
var dtf = dt.binary(conditions, classes);
var result = dtf(img_mod);
var mask = result.select('class1');
return ee.Image(image).updateMask(mask).select(bands)
}

  var imgC = ee.ImageCollection('COPERNICUS/S2').filterBounds(ROI).filterDate(start,end)//.select(bands) ;
  var img=imgC.map(cloudMask).median().clip(ROI) ;


var visParams={bands:['B4','B3','B2'], max:3000};
Map.addLayer(img,visParams)

var visualization=img.visualize({
  bands:['B4','B3','B2'],
  max:3000
});

Export.image.toDrive({
  image: visualization,
  description: 'Cologne',
  scale: 100,
  region: ROI
});
Map.addLayer(visualization)
