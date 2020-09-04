const { tasks, users } = require('../constans/index');
module.exports = {
     Query:{
      
        users: () => users,
        user: (_,{id}) =>  users.find(user => user.id === id)      

    },
   
    User: {
        tasks: ({id}) =>  tasks.filter(task => task.userId === id)
        
    }
}