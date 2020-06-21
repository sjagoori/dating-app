const getCommandList = function() {
  return {
    setOwn: {
      arguments: [
        {
          label: 'interest',
          values: ['languages', 'skillLevel', 'occupation'],
        },
        {
          label: 'value',
          dependant: true,
          values: [
            ['Java', 'C', 'Python', 'Javascript', '.NET'],
            ['amateur', 'intermediate', 'expert'],
            ['frontEnd', 'backEnd', 'fullStack'],
          ],
        },
      ],
      function: function(req, res, args, userModel) {
        const personal = req.session.user.personal;
        if (args[0] === 'languages') {
          personal[args[0]].push(args[1]);
        } else {
          personal[args[0]] = args[1];
        }
        userModel.findOneAndUpdate({email: req.session.user.email},
            {$set: {personal}},
            {new: true},
            (err) => {
              if (err) {
                return res.status(500).send('couldn\'t connect to the database');
              }
            },
        );
      },
      success: function(args) {
        return `Succesfully set own ${args[0]} to ${args[1]}`;
      },
    },
    setPref: {
      arguments: [
        {
          label: 'interest',
          values: ['languages', 'skillLevel', 'occupation'],
        },
        {
          label: 'value',
          dependant: true,
          values: [
            ['Java', 'C', 'Python', 'Javascript', '.NET'],
            ['amateur', 'intermediate', 'expert'],
            ['frontEnd', 'backEnd', 'fullStack'],
          ],
        },
      ],
      function: function(req, res, args, userModel) {
        const preferences = req.session.user.preferences;
        if (args[0] === 'languages') {
          preferences[args[0]].push(args[1]);
        } else {
          preferences[args[0]] = args[1];
        }
        userModel.findOneAndUpdate({email: req.session.user.email},
            {$set: {preferences}},
            {new: true},
            (err) => {
              if (err) {
                return res.status(500).send('couldn\'t connect to the database');
              }
            },
        );
      },
      success: function(args) {
        return `Succesfully set ${args[0]} preference to ${args[1]}`;
      },
    },
    cd: {
      arguments: [
        {
          label: 'location',
          values: ['discover', 'profile', 'preferences'],
        },
      ],
      function: function(req, res, args, userModel) {
        res.redirect(args[0]);
      },
      success: function(args) {
        return `Succesfully redirected to ${args[0]}`;
      },
    },
    match: {
      arguments: [],
      function: function(req, res, args, userModel) {
      },
      success: function(args) {
        return `Succesfully matched with previous user.`;
      },
    },
    skip: {
      arguments: [],
      function: function(req, res, args, userModel) {
      },
      success: function(args) {
        return `Succesfully skipped previous user.`;
      },
    },
  };
};
if (typeof module !== 'undefined' && module.exports) {
  exports.getCommandList = getCommandList;
};
