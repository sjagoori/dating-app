const getCommandList = function() {
  return {
    addInterest: {
      tag: 'actions',
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
    },
  };
};
if (typeof module !== 'undefined' && module.exports) {
  exports.getCommandList = getCommandList;
};
