var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/warzywa', function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});
var warzywa = mongoose.model('warzywas', new mongoose.Schema({
    _id : String,
    name: String,
    country: String,
    cost: String,
}));

var warzywo_add = function() {
  new warzywa({
    _id:          mongoose.Types.ObjectId(),
    name:         $("#warzywo_name").val(),
    country:         $("#warzywo_country").val(),
    cost:         $("#warzywo_cost").val(),
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
  warzywa.find({}, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      $('.sekcja').remove();
      var content = "";
      $(".warzywa").append("<table class='sekcja'><tr><td>Name</td><td>Country</td><td>Price</td><td>Delete</td><td>Edit</td></tr></table>");
      for(var i = 0; i < result.length; i++) {
        content +=    "<tr><td>"+result[i].name+"</td>"+
                      "<td>"+result[i].country+"</td>"+
                      "<td>"+result[i].cost+"</td>"+
                      "<td><input type='submit' value='Delete' onclick='warzywo_delete("+JSON.stringify(result[i]._id)+")'></td>"+
                      "<td><input type='submit' value='Edytuj' onclick='warzywo_edycja("+JSON.stringify(result[i]._id)+")'></td></tr>";
      }
      $(".sekcja").append(content);
    }
  });
};
$().ready(function() {
  wypisz();
});

var warzywo_delete = function(id) {
  warzywa.find({ _id: id }, function(err, result) {
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

var warzywo_edycja = function(id) {
  $(".edit").show();
  warzywa.findOne({ _id: id }, function(err, result) {
    if(err) {
      console.log(err); next();
    } else {
      $("#edit_name").val(result.name);
      $("#edit_country").val(result.country);
      $("#edit_cost").val(result.cost);
      $("#edit_id").val(result._id);
    }
  });
};

var warzywo_edytujdb = function(id) {
  warzywa.find({ _id: $("#edit_id").val() }, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }).update({
    name: $("#edit_name").val(),
    country: $("#edit_country").val(),
    cost: $("#edit_cost").val(),
  }).exec();
 $(".edit").hide();
 wypisz();

};
