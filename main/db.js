var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/leki', function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});
var leki = mongoose.model('lekis', new mongoose.Schema({
    _id : String,
    name: String,
    type: String,
    cost: String,
}));

var lek_add = function() {
  new leki({
    _id:          mongoose.Types.ObjectId(),
    name:         $("#lek_name").val(),
    type:         $("#lek_type").val(),
    cost:         $("#lek_cost").val(),
  }).save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Dodano");
    }
  });

  wypisz();
};

var wypisz = function(){
  leki.find({}, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      $('.sekcja').remove();
      var content = "";
      $(".leki").append("<table class='sekcja'><tr><td>Nazwa</td><td>Typ</td><td>Cena</td><td>Usun</td><td>Edytuj</td></tr></table>");
      for(var i = 0; i < result.length; i++) {
        content +=    "<tr><td>"+result[i].name+"</td>"+
                      "<td>"+result[i].type+"</td>"+
                      "<td>"+result[i].cost+"</td>"+
                      "<td><input type='submit' value='Delete' onclick='lek_delete("+JSON.stringify(result[i]._id)+")'></td>"+
                      "<td><input type='submit' value='Edytuj' onclick='lek_edycja("+JSON.stringify(result[i]._id)+")'></td></tr>";
      }
      $(".sekcja").append(content);
    }
  });
};
$().ready(function() {
  wypisz();
});

var lek_delete = function(id) {
  leki.find({ _id: id }, function(err, result) {
    if(err) {
      console.log('problem z pobraniem');
    }
  }).remove(function(err) {
    if(err) {
      console.log(err);
    } else {
       console.log("usunieto");
    }
  });

wypisz();
};

var lek_edycja = function(id) {
  $(".edit").show();
  leki.findOne({ _id: id }, function(err, result) {
    if(err) {
      console.log(err); next();
    } else {
      $("#edit_name").val(result.name);
      $("#edit_type").val(result.type);
      $("#edit_cost").val(result.cost);
      $("#edit_id").val(result._id);
    }
  });
};

var lek_edytujdb = function(id) {
  leki.find({ _id: $("#edit_id").val() }, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }).update({
    name: $("#edit_name").val(),
    type: $("#edit_type").val(),
    cost: $("#edit_cost").val(),
  }).exec();
 $(".edit").hide();
 wypisz();

};
