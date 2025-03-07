'use strict';

var Common = require('./common');

function GovObjectController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

GovObjectController.prototype.submit = function (req, res) {
  var self = this;

  var parentHash = req.body.parentHash || (function(){throw new Error('missing parentHash')}());
  var revision = req.body.revision || (function(){throw new Error('missing revision')}());
  var time = req.body.time || (function(){throw new Error('missing time')}())
  var dataHex = req.body.dataHex || (function(){throw new Error('missing dataHex')}());
  var feeTxId = req.body.feeTxId || (function(){throw new Error('missing feeTxId')}());

  this.node.services.vkaxd.govObjectSubmit(parentHash, revision, time, dataHex, feeTxId, function(err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result)
  });
}

GovObjectController.prototype.list = function(req, res) {
  var options = {
    type:1//by default display proposal
  };
  if (req.params.filter) {
      if (req.params.filter === 'proposal') options.type = 1;
      if (req.params.filter === 'trigger') options.type = 2;
  }

  this.govObjectList(options, function(err, result) {
    if (err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(result);
  });

};

GovObjectController.prototype.govObjectList = function(options, callback) {
    this.node.services.vkaxd.govObjectList(options, function(err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });

};


GovObjectController.prototype.show = function(req, res) {
    var self = this;
    var options = {};

    this.getHash(req.hash, function(err, data) {
        if(err) {
            return self.common.handleErrors(err, res);
        }

        res.jsonp(data);
    });

};

GovObjectController.prototype.getHash = function(hash, callback) {

    this.node.services.vkaxd.govObjectHash(hash, function(err, result) {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });

};

/**
 * Verifies that the GovObject Hash provided is valid.
 *
 * @param req
 * @param res
 * @param next
 */
GovObjectController.prototype.validateHash = function(req, res, next) {
    req.hash = req.params.hash;
    this.isValidHash(req, res, next, [req.hash]);
};

GovObjectController.prototype.isValidHash = function(req, res, next, hash) {
    // TODO: Implement some type of validation
    if(hash) next();
};


GovObjectController.prototype.govObjectCheck = function(req, res) {
  var self = this;
  var hexdata = req.params.hexdata;

  this.node.services.vkaxd.govObjectCheck(hexdata, function(err, result) {
    if (err) {
      return self.common.handleErrors(err, res);
    }
    res.jsonp(result);
  });
};

GovObjectController.prototype.getInfo = function (req, res) {
  var self = this;
  this.node.services.vkaxd.govObjectInfo(function (err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result);
  })
}

GovObjectController.prototype.getCount = function (req, res) {
  var self = this;
  this.node.services.vkaxd.govCount(function (err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result);
  })
}

GovObjectController.prototype.govObjectVotes = function (req, res) {
  var self = this;
  var govHash = req.params.hash;

  this.node.services.vkaxd.getVotes(govHash, function (err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result);
  })
}

GovObjectController.prototype.govObjectCurrentVotes = function (req, res) {
  var self = this;
  var govHash = req.params.hash;

  this.node.services.vkaxd.getCurrentVotes(govHash, function (err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result);
  })
}

GovObjectController.prototype.govObjectDeserialize = function (req, res) {
  var self = this;
  var hexdata = req.params.hexdata;

  this.node.services.vkaxd.govObjectDeserialize(hexdata, function (err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result);
  })
}
module.exports = GovObjectController;
