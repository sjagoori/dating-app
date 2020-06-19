const getCommandList = function() {
  return {
    addInterest: {
      arguments: [
        {
          label: 'interest',
          values: ['language', 'skillLevel', 'occupation'],
        },
        {
          label: 'value',
          dependant: true,
          values: [
            ['Java', 'C', 'Python', 'JavaScript', '.NET'],
            ['amateur', 'intermediate', 'expert'],
            ['frontend', 'backend', 'fullStack'],
          ],
        },
      ],
      function: function(req, res, args) {
        console.log('Add Interest: ' + args[0] + ' - ' + args[1]);
      },
      success: function(args) {
        return `Succesfully added ${args[0]} interest: ${args[1]}`;
      },
    },
    remInterest: {
      arguments: [
        {
          label: 'interest',
          values: ['language', 'skillLevel', 'occupation'],
        },
        {
          label: 'value',
          dependant: true,
          values: [
            ['Java', 'C', 'Python', 'JavaScript', '.NET'],
            ['amateur', 'intermediate', 'expert'],
            ['frontend', 'backend', 'fullStack'],
          ],
        },
      ],
      function: function(req, res, args) {
        console.log('Remove Interest: ' + args[0] + ' - ' + args[1]);
      },
      success: function(args) {
        return `Succesfully removed ${args[0]} interest: ${args[1]}`;
      },
    },
    cd: {
      arguments: [
        {
          label: 'location',
          values: ['discover', 'profile', 'preferences'],
        },
      ],
      function: function(req, res, args) {
        res.redirect(args[0]);
      },
      success: function(args) {
        return `Succesfully redirected to ${args[0]}`;
      },
    },
    match: {
      arguments: [],
      function: function(req, res, args) {
      },
      success: function(args) {
        return `Succesfully matched previous user.`;
      },
    },
    skip: {
      arguments: [],
      function: function(req, res, args) {
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
