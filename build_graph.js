function maketree() {
      function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'location.json', true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
          }
        };
        xobj.send(null);
      }
      function loadJSON1(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'time.json', true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
          }
        };
        xobj.send(null);
      }
      function loadJSON2(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'topics_new.json', true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
          }
        };
        xobj.send(null);
      }
      function loadJSON3(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'fid_content_title_n.json', true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
          }
        };
        xobj.send(null);
      }
      function loadJSON4(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'fid_content_title.json', true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
          }
        };
        xobj.send(null);
      }
      // Inside the loadJSON, variable data stores the json file taxo_CatEm. You can use it inside the function load JSON. Don't use it beyond this function.
      loadJSON(function(json) {
        loadJSON1(function(json1) {
          loadJSON2(function(json2) {
            loadJSON3(function(json3) {
              loadJSON4(function(json4) {
                // Click will remove previous history
                var need = document.getElementById("myList");
                if (need.innerHTML != "") {
                  need.innerHTML = "";
                }
          var location = json;
          var time = json1;
          var topics_new = json2;
          var fid_content_title = json3;
          var fid_content_title_n = json4;

          var city_input = document.getElementById("cityinput").value;
          var time_input = document.getElementById("timeinput").value;

          var location_index = [];
          var time_index = [];
          for (var i = 0; i < location.length; i++) {
            var temp_location_key = Object.keys(location[i]);
            var temp_time_key = time[i].substr(0,4);
            for (var j = 0; j < temp_location_key.length; j++) {
              if (temp_location_key[j].includes(city_input.toString())) {
                location_index.push(i);
              }
            }
            if (temp_time_key == time_input.toString()) {
              time_index.push(i);
            }
          }
          var final_index_array = [];
          for (var i = 0; i < time_index.length; i++) {
            if (location_index.includes(time_index[i])) {
              final_index_array.push(time_index[i]);
            }
          }
          var topic_dict = {};
          var important_paper_index = {};
          for (var i = 0; i < final_index_array.length; i++) {
            var temp_topic = topics_new[final_index_array[i]];
            if (!(temp_topic in topic_dict)) {
              topic_dict[temp_topic] = 1;
              important_paper_index[temp_topic]=[];
              important_paper_index[temp_topic].push(final_index_array[i]);
            } else {
              topic_dict[temp_topic] += 1;
              important_paper_index[temp_topic].push(final_index_array[i]);
            }
          }
          var out_topic_dict = {};
          //this is for click event
          var important_pie_chart_dict={};
          var inner_topic_dict = {};
          for (var key in topic_dict) {
            if (key.includes(".")) {
              out_topic_dict[key] = topic_dict[key];
              important_pie_chart_dict[key] = important_paper_index[key];
            } else {
              inner_topic_dict[key] = topic_dict[key];
            }
          }

///Build Pie Chart Graph
        var inner_label = [];
            var inner_data = [];
            for (var i = 0; i < Object.keys(out_topic_dict).length; i++) {
              inner_data.push(0);
            }
            for (var key in inner_topic_dict) {
              inner_label.push(key.toString());
              inner_data.push(parseInt(inner_topic_dict[key]));
            }



          var outer_label = [];
          var outer_data = [];
          for (var key in out_topic_dict) {
              outer_label.push(key.toString().split(".")[1]);
              outer_data.push(parseInt(out_topic_dict[key]));}
          // for (var i = 0; i < inner_label.length; i++) {
          //   outer_label.push(inner_label[i]);
          // }
          console.log(time.length);
          console.log(Object.keys(fid_content_title).length);
          var temp_chart = document.getElementById("chart1");
          var innerhtml = " <canvas id='doughnutChart1' style='height:220px;'></canvas>"
          temp_chart.innerHTML = innerhtml;
        var canvas = document.getElementById("doughnutChart1")
        var ctxD = canvas.getContext('2d');

    var myPieChart = new Chart(ctxD, {
      type: 'doughnut',
      data: {
        labels: outer_label,
        datasets: [
          {
          data:outer_data,
          backgroundColor: ["#5DA5DA", "#F15854 ", "#B276B2", "#B2912F", "#FAA43A", "#ffeaa5","#40a798", "#d25959", "#55415f","#646964","#d77355","#508cd7","#64b964","#e6c86e","#dcf5ff", "#FFFFFF"],
          hoverBackgroundColor: ["#5DA5DA", "#F15854 ", "#B276B2", "#B2912F", "#FAA43A", "#ffeaa5","#40a798", "#d25959", "#55415f","#646964","#d77355","#508cd7","#64b964","#e6c86e","#dcf5ff", "#FFFFFF"]
        },
        // {
        //   data: inner_data,
        //   backgroundColor:["#5DA5DA", "#F15854 ", "#B276B2", "#B2912F", "#FAA43A", "#ffeaa5","#40a798", "#d25959", "#55415f","#646964","#d77355","#508cd7","#64b964","#e6c86e","#dcf5ff", "#FFFFFF"],
        //   hoverBackgroundColor:["#5DA5DA", "#F15854 ", "#B276B2", "#B2912F", "#FAA43A", "#ffeaa5","#40a798", "#d25959", "#55415f","#646964","#d77355","#508cd7","#64b964","#e6c86e","#dcf5ff", "#FFFFFF"]
        // }
      ]
      },
      options: {
        responsive: false,
        legend: {
          position: 'right',
          display: true,
          labels: {
              boxWidth: 20,
              padding: 20
          }
      },
      //pie chart click event
      'onClick' : function (evt) {
        var list_container = document.getElementById("myList");
        var modal = document.getElementById("Modal_group");
        var modal_html = "";
        var paper_details= "";
        var points = myPieChart.getElementsAtEvent(evt);
        var graph_index = points[0]._index;
        var paper_index = important_pie_chart_dict[Object.keys(out_topic_dict)[graph_index]];
        var i = 0;
        for (var key in fid_content_title) {
          if (paper_index.includes(i)) {
              var temp_paper = fid_content_title[key];
              var title = temp_paper.title;
              var target_id = "#myModal" + i.toString();
              var text = temp_paper.text;
          paper_details+='<a data-toggle="modal" data-target=' + target_id + ' class="list-group-item list-group-item-action flex-column align-items-start" style="border-radius:20px; width:420px!important; border-style:none;"><li class="font-weight-bold" style="list-style:none; font-size:14px;">'+title+'</li></a>';
          modal_html += '<div class="modal fade" id="myModal' + i.toString() +'" role="dialog"><div class="modal-dialog" style="margin-right:600px!important;"><div class="modal-content" style="border-radius:40px!important; border: none; width:1000px!important;"><div class="modal-header" style="border:none!important;" ><div class="portfolio-modal-dialog bg-white" ><a class="close-button d-none d-md-block portfolio-modal-dismiss" data-dismiss="modal" style="color: #4e73df;!important;margin-left:920px;"><i class="fa fa-3x fa-times"></i></a><div class="container text-center" ><div class="row"> <div class="col-lg-8 mx-auto"><h2 class="text-secondary mb-0" style="text-align:left;">' +title+'</h2><p class="mb-5" style="text-align:left; font-size:15px; margin-top:15px;">'+'</p><p class="mb-5" style="text-align:left; font-size:15px; margin-top:-30px;">'+'</p><p class="mb-5" style="font-weight:15px; margin-top:-30px!important; text-align:left;">'+'</p><hr class="star-dark mb-5" style="font-size:10px;"><p class="mb-5" style="text-align:left; text-indent: 30px;">'+ text+'</p><a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" data-dismiss="modal"  style="color:#FFF!important;"> <i class="fa fa-close"></i>Close</a></div>   </div></div> </div> </div></div> </div></div>';
          }
          i+=1
        }
        list_container.innerHTML = paper_details;
        $('.rolldown-list a').each(function () {
      // var delay = ($(this).index() / 4) + 's';
      var delay = ($(this).index() / 8) + 's';
      $(this).css({
        webkitAnimationDelay: delay,
        mozAnimationDelay: delay,
        animationDelay: delay
      });
    });
    modal.innerHTML = modal_html;

                   }
      }
    });

//     $(document).ready(
//   function() {
//     var canvas = document.getElementById("myChart");
//     var ctx = canvas.getContext("2d");
//     var myNewChart = new Chart(ctx, {
//       type: 'pie',
//       data: data
//     });
//
//     canvas.onclick = function(evt) {
//       var activePoints = myNewChart.getElementsAtEvent(evt);
//       if (activePoints[0]) {
//         var chartData = activePoints[0]['_chart'].config.data;
//         var idx = activePoints[0]['_index'];
//
//         var label = chartData.labels[idx];
//         var value = chartData.datasets[0].data[idx];
//
//         var url = "http://example.com/?label=" + label + "&value=" + value;
//         console.log(url);
//         alert(url);
//       }
//     };
//   }
// );





   //begin to draw line chart
   var military = ["military.combat", "military.weapons", "military.terrorism", "military.ceasefire", "military.miss"];
   var economics = ["economics.trade", "economics.finance", "economics.tax", "economics.welfare", "economics.miss"];
   var politics = ["politics.justice", "politics.election", "politics.international_relation", "politics.governance", "politics.miss"];

   var check_box_id_list = ["military1", "military2", "military3","military4","military5", "economics1", "economics2", "economics3", "economics4", "economics5", "politics1", "politics2", "politics3", "politics4", "politics5"];
   var checked_box_id;
   for (var i = 0; i < check_box_id_list.length; i++) {
     var temp = document.getElementById(check_box_id_list[i]).checked;
     if (temp == true) {
       checked_box_id = check_box_id_list[i];
       break;
     }
   }
   var selected_topic = checked_box_id.substr(0,checked_box_id.length - 1);
   var build_line_chart_dict = {};
   var topic_list;
   if (selected_topic == "military") {
     topic_list = military;
   } else if (selected_topic == "economics") {
     topic_list = economics;
   } else if (selected_topic == "politics") {
     topic_list = politics;
   }
   for (var i = 0; i < topic_list.length; i++) {
     build_line_chart_dict[topic_list[i]] = {};
     for (var j = 1; j<= 12; j++) {
       build_line_chart_dict[topic_list[i]][j] = 0;
     }
   }


for (var index in location_index) {
  var temp_time = parseInt(time[index].substr(5,6));
  var temp_topic = topics_new[index].split(".");
  if (temp_topic.length == 1) {
    if (temp_topic == topic_list[0].split(".")[0]) {
      console.log(temp_topic+".miss");
      build_line_chart_dict[temp_topic+".miss"][temp_time.toString()] += 1;
    }
  } else {
    var temp_key = topic_list[0].split(".")[0];
    var final_topic = temp_key +"."+ temp_topic[1];
    if (final_topic in build_line_chart_dict) {
    build_line_chart_dict[final_topic][temp_time.toString()] += 1;
  }
  }

}

function hexToRgb(hex, alpha) {
  hex   = hex.replace('#', '');
  var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
  var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
  var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
  if ( alpha ) {
     return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }
  else {
     return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

}


var line_chart_label = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var final_chart = document.getElementById("linechart");
final_chart.innerHTML = '<canvas id="FinalLine3" style="height:500px; width:600px;"></canvas>';
  var ctxL3 = document.getElementById("FinalLine3").getContext('2d');
  var myLineChart3 = new Chart(ctxL3, {
    type: 'line',
    data: {
      labels: line_chart_label,
      datasets: [
        // {
        //         label:"first",
        //         data: [0,1,2,3,4,5,6,7,8,9,10,11],
        //         backgroundColor: [
        //           "#009392","#39b185","#9ccb86","#e9e29c","#eeb479","#e88471","#cf597e"
        //         ],
        //         borderColor: [
        //           "#009392","#39b185","#9ccb86","#e9e29c","#eeb479","#e88471","#cf597e"
        //         ],
        //         borderWidth: 1
        //       }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle:true
        }
      }
    }
  });

  var beautiful_color_array3=["#5DA5DA", "#F15854 ", "#B276B2", "#B2912F", "#FAA43A"];
for (var i = 0; i < 5; i++) {
  var temp_label = topic_list[i];
  var temp_data = Object.values(build_line_chart_dict[temp_label]);
  var final_data = [];
  for (var j = 0; j < temp_data.length; j++) {
    final_data.push(parseInt(temp_data[j]));
  }
  var temp_color = hexToRgb(beautiful_color_array3[i], 0.15+0.1*i);
  myLineChart3.data.datasets.push(
    {
      label:temp_label,
      data: final_data,
      backgroundColor: [
        temp_color,
      ],
      borderColor: [
        temp_color,
      ],
      borderWidth: 1
    });
  myLineChart3.update();
}












      //Close old_CatEm
//Close papers;
});
});
    });
//Close paper_class
    });
//Close data
      });
    }
