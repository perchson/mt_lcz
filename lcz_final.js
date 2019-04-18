var getTraTstSample = require('users/ele_tutorial/MT:new/getTraTstSample') ;
var indexSentinel2 = require('users/ele_tutorial/MT:new/index') ;
var dt = require('users/fitoprincipe/geetools:decision_tree');

/*************************parameter*****************/
var bands = [ 'B2', 'B3', 'B4',  'B8', 'B8A', 'B11', 'B12', 'B1',  'B9', 'B10'];
var Band_order = ee.List([ 'B1',  'B9', 'B10', 'B2', 'B3', 'B4', 'B8', 'B8A', 'B11', 'B12',  'NDVI', 'EVI', 'MNDWI', 'NDBI', 'BSI', 'BRBA', 'NBAI', 'light'/*,'elevation'*/]) ;

/*************************Data*****************/
//Here is the data for both 5-fold and 8+1 cross-validation
//for 3 types of training dataset: initial, balanced and reduced imbalanced

// 9 cities
var test1=ee.FeatureCollection('ft:1KVV3nUyMtyNNLKZpJue2NiQJwaNA7SeGApHTviR0') ;
var test2=ee.FeatureCollection('ft:1fowRMADfqPfUA41KRaGhXj8JqkWmIZRlY46pAoEu') ;
var test3=ee.FeatureCollection('ft:1SIkonpAMij0hcJnnEa4g89a22HhWFZEwKtcLeyFZ') ;
var test4=ee.FeatureCollection('ft:1kRM9lAgI-EJD8wy_BdovQzu-msBnh8d7IN3RHOGb') ;
var test5=ee.FeatureCollection('ft:12vzfk2wmbDiGQyoNOHABoizi6gvTlFunt5Pcrj50') ;

// //8+1 cities
// var test1=ee.FeatureCollection('ft:15a7A8lGr59O8Abe1Q2R0om9hsEPIyTzdarIVNaNF') ; //Amsterdam
// var test2=ee.FeatureCollection('ft:188EDpw1mQeCpoqGMf7eBswaqTl8P1_IJ1tu6rZ_H') ; //Berlin
// var test3=ee.FeatureCollection('ft:1BEGhvojRyIfqvoc8uGoqywG8fO5RE8_Eo_QNwk9h') ; //Cologne
// var test4=ee.FeatureCollection('ft:1Z9GlZiYw4NBYuuSteFOAtYZCadrGcOWHy6Optmtn') ; //London
// var test5=ee.FeatureCollection('ft:10UNrUJ1fFQcm5HhOVplqCIP5PVkdNLwA-4DB-486') ; //Milan
// var test6=ee.FeatureCollection('ft:1uE98QQ6xTkXZf1yTPXfkFwf_W6ktHxLrUS65y779') ; //Munich
// var test7=ee.FeatureCollection('ft:1MCgQsRC6Q3p0rE6Dtx48b9LKvJVP4k4w4pYfHIzu') ; //Paris
// var test8=ee.FeatureCollection('ft:1q49bF5GfJHXE1bq_sWzIjz-eO029sT2cMyB0d_sh') ; //Rome
// var test9=ee.FeatureCollection('ft:1ctXYPanDJHApFKjGSmDO_CDiGg36MuZ4xb-P1bhU') ; //Zurich

// // 9 cities balanced
// var test1=ee.FeatureCollection('ft:1RNG8WK7cJu-G296aed6IqAxkREatoTYeCovNo7hD') ;
// var test2=ee.FeatureCollection('ft:1oEO6QoOi2TXkFd6pzXYH18SrlT1VV0BRPlSjG5Xy') ;
// var test3=ee.FeatureCollection('ft:14VQjrAnpDNmpXWNh_g6h7fl_xA7oqVLoKnlKZHrM') ;
// var test4=ee.FeatureCollection('ft:131GvpyiYiLVQaV0DJ2LvZtbNH9cnkbZx1sPmh9BY') ;
// var test5=ee.FeatureCollection('ft:10Wvgj97AJgvlwjg8oAuUVbnJZBAV_lUjiOeqf9rK') ;

// //8+1 cities balanced
// var test1=ee.FeatureCollection('ft:188CAB9KTnWR0gqcB20A5TldWIkEIdyg7L7dhfiYf') ; //Amsterdam
// var test2=ee.FeatureCollection('ft:1gKxC4UyNMwvSvAp29vs7aSjRYNY2GEEj9daJ3Zs2') ; //Berlin
// var test3=ee.FeatureCollection('ft:1Kgf7zviRsDTs1lefxVJoFqERgJLSj9o1v2tA2wv9') ; //Cologne
// var test4=ee.FeatureCollection('ft:1MKDogkQSZmlg0sLDD6px-MZIUjgAVfG6l6BV1tu-') ; //London
// var test5=ee.FeatureCollection('ft:1Jme1PDV0OhDfYDCpYmYOvUf1bAyWFlR3qMBGLwMl') ; //Milan
// var test6=ee.FeatureCollection('ft:1ua9mdB7hgu7jLTXcCxZR2w-3mmVSCbc93bg4DkHn') ; //Munich
// var test7=ee.FeatureCollection('ft:1h7jVKhz_s9blY0RkCCqeKzWLN_VPCovBqb-aguBs') ; //Paris
// var test8=ee.FeatureCollection('ft:1nxJ11p0gfzuXb5KjqnB89lW6gOjzzcAFneDmNopK') ; //Rome
// var test9=ee.FeatureCollection('ft:1TqAK3qDmx7FgW0MhnPWgrOOVOhr-3Nnf59-oC1l5') ; //Zurich

// // 9 cities imbalanced small
// var test1=ee.FeatureCollection('ft:16prm919juWZYp3laEAAWLA-A_qynafq_Bal5Yv8a') ;
// var test2=ee.FeatureCollection('ft:1MLpG9DCTO1nDy1rupgYXmnH2PDmCm2lax_ECi26n') ;
// var test3=ee.FeatureCollection('ft:15fS0Xj-uOQ_8XVlyQvVWW9ohc0o75uJ1sqLz1WZK') ;
// var test4=ee.FeatureCollection('ft:1wxdVQeA9gD1RHrWLwDemzBRuEvrZ2pYD5FRs_VfS') ;
// var test5=ee.FeatureCollection('ft:1559Km_7sr_6BwyiEzxwECzO4D73F8VzKy0WEtrBL') ;

// //8+1 cities imbalanced small
// var test1=ee.FeatureCollection('ft:175Ltbx9YwQc3NVN5lHqIsxl_d85Uj4uuXuYeOfx1') ; //Amsterdam
// var test2=ee.FeatureCollection('ft:1J3I14Ej7p5DaEnEmqgfa-mSQyfo3UMq4X2fcBhn_') ; //Berlin
// var test3=ee.FeatureCollection('ft:1wPabzM5ddy-KZVWDhr6UkvQo2QvOW4-LRxa-Xo_j') ; //Cologne
// var test4=ee.FeatureCollection('ft:1cCNGXCnsKYHMwv6WwWo0QbXjeAyPPG2hYxJjHBfD') ; //London
// var test5=ee.FeatureCollection('ft:1mzt3L_mXQHnbkmGBuTthXntdW00QWlhqrOTQVqa-') ; //Milan
// var test6=ee.FeatureCollection('ft:1N9hpvmIq-aM78YaSut52MaZ98lnbhhY_DZxtuiEO') ; //Munich
// var test7=ee.FeatureCollection('ft:1PwX6F3axeKfcmYxjTcO6bcXySveyIDlqQuNtcg2R') ; //Paris
// var test8=ee.FeatureCollection('ft:1fk1Gw_iHJiwQLs4ps-ZxiXdK3xA6dl390TgIRAOe') ; //Rome
// var test9=ee.FeatureCollection('ft:1V4nlW6qOeEinxiQ4-N0vqRSzMPIwAfEDwdPzJFIQ') ; //Zurich

//In case of 5-fold cross-validation only first 5 files were used
var training= test2.merge(test3).merge(test4).merge(test5)//.merge(test6).merge(test7).merge(test8).merge(test9)
var test=test1
print(test.size())

/*************************functions*****************/
/* CLOUDLESS DECISION TREE (overall accuracy ~91%)
Based on the algorithm introduced in "Ready-to-use methods for the detection of clouds,
cirrus, snow, shadow, water and clear sky pixels in Sentinel-2 MSI images" DOI: 10.3390/rs8080666
*/
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

//Filtering by date and bounds, cloud removal and image compositing
function getImg(ROI, start, end){
  var imgC = ee.ImageCollection('COPERNICUS/S2').filterBounds(ROI).filterDate(start,end) ;
  var img=imgC.map(cloudMask).median().clip(ROI) ;
  return  img;
}

//Training classifier and classification
function img2Map(image) {
var train = getTraTstSample.getTraTstSample_img(image, training).set('band_order', Band_order) ;
var trained = ee.Classifier.randomForest(5)
    .train(train, 'class');
return image.classify(trained) ;
}

//Additional indices and feature
function date2Img(ROI, start, end) {
var imageCollectionLight = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG").filterDate(start, end) ;
var imgLight = ee.Image(imageCollectionLight.first()).select('avg_rad')
imgLight=ee.Image(imgLight).divide(100)
var image = getImg(ROI, start, end)
image = indexSentinel2.indexSentinel2(image)//add index
image=image.addBands(imgLight.clipToCollection(ROI).rename('light')) ; //add feature
return image;
}

var ROI=ee.FeatureCollection('ft:1rbq7_NLEAElO0dAdr0MzDTDdeQYcRFPa7sSCZuZq') ;//ROI 9 cities

var year= 2017;

// //The whole year classification
// var start = ee.Date.fromYMD(year,3,1)
// var end = start.advance(12,'month')
// var image= date2Img(ROI, start, end)
// print(image)
// var classified=img2Map(image)
// print(classified)

//The multiseasonal classification
var start = ee.Date.fromYMD(year,3,1)//spring
var end = start.advance(3,'month')//
var image= date2Img(ROI, start, end)
var spring_1=img2Map(image)

var start = ee.Date.fromYMD(year,6,1)//summer
var end = start.advance(3,'month')//
var image= date2Img(ROI, start, end)
var summer_1=img2Map(image)

var start = ee.Date.fromYMD(year,9,1)//autumn
var end = start.advance(3,'month')//
var image= date2Img(ROI, start, end)
var autumn_1=img2Map(image)

var start = ee.Date.fromYMD(year,12,1)//winter
var end = start.advance(3,'month')//
var image= date2Img(ROI, start, end)
var winter_1=img2Map(image)

var imgC = ee.ImageCollection.fromImages([ee.Image(spring_1), ee.Image(summer_1),ee.Image(autumn_1),ee.Image(winter_1)]);
var classified =ee.Image(imgC.mode()) ;

var Testing=classified.sampleRegions({
  // Get the sample from the polygons FeatureCollection.
  collection: test,
  // Keep this list of properties from the polygons.
  properties: ['class'],
  scale: 100, tileScale: 8
  });

// Export the FeatureCollection to a KML file.
Export.table.toDrive({
  collection: Testing,
  description:'test'+1,
});

var igbpPalette = [
'85060A',
'026805',
'00AB05',
'608726',
'B9DC7E',
'F9F8A8',
'6E6BFE'
];
Map.addLayer(classified, {palette: igbpPalette, min: 0, max: 6});

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
    fontSize: '25px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);

var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          fontWeight: 'bold',
          padding: '20px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px',
        fontWeight: 'semibold',
    fontSize: '25px'

        }
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var names = ['Urban','Dense trees','Scattered trees', 'Bush, scrub','Low plants','Bare soil or sand','Water'];
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(igbpPalette[i], names[i]));
  }
Map.add(legend);

 var ROI = ee.FeatureCollection('ft:1vhzh6RUFHNtQS9nV0Xh4Mz62uu2P0xoiheBstF37');//Moscow_ro
//var ROI = ee.FeatureCollection('ft:1yOYcVVUsb3NaNzGA3s56gi8IpUWm3Ye2XxDo6uw9');//Lisbon_roi
// var ROI = ee.FeatureCollection('ft:1A7KEPm61UnQ2YAoJqPJA6qWY-ctffG7Oc-2YI57-');//Madrid_roi

// var ROI=ee.FeatureCollection('ft:1rbq7_NLEAElO0dAdr0MzDTDdeQYcRFPa7sSCZuZq') ;//ROI 9 cities
// var ROI=ee.FeatureCollection('ft:1Fk0SYlZu-MoAsCK5V14eoWWnWdg0qrb8Mvwtwg5j') ;//Amsterdam_roi
// var ROI=ee.FeatureCollection('ft:1Uyb6Pbaskp6X5xr4FVCs_Q0KlVXAex7BJChrMcMY') ;//Berlin_roi
// var ROI=ee.FeatureCollection('ft:1eBzXp5sMzOnQdxrB1uOoJoo9PMKK9ZRJqIlvrqcq') ;//Cologne_roi
// var ROI=ee.FeatureCollection('ft:12ERapKaci2dc36NH78W3QqWksVWWMCirkOi3gJoJ') ;//London_roi
// var ROI=ee.FeatureCollection('ft:1NETO59ScsBmPdSAHvLuJHgP9UveHDWMVZeMb3yxC') ;//Milan_roi
// var ROI=ee.FeatureCollection('ft:1bTmjrH4z5p0N4c9i21IrjudlwcK2J1m3qh8cJ0Eh') ;//Munich_roi
// var ROI=ee.FeatureCollection('ft:1UNke9-aO2NzUbVDWrJr1Z6GXgRpUPvGcI0DsilQn') ;//Paris_roi
// var ROI=ee.FeatureCollection('ft:1R10vnaR0iwrxH5ovkw5zzO3E0dGl-6-Yh72vhLTY') ;//Rome roi
// var ROI=ee.FeatureCollection('ft:1mdN_Rd-iEZy0RwJsgZn4wkaO9vpfH51uS-x_hI4V') ;//Zurich_roi

Export.image.toDrive({
  image: classified,
  description: 'Moscow',
  scale: 100,
  maxPixels:10000000000,
  region: ROI
});
