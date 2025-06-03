const AllFoodReducer = (state , action)=>{
    // console.log(state , action);
    const PartyCategry = ['Momos' , 'Pizza' ,'Cake' , 'Starter'];
    switch (action.type) {
        case "ALL":
            return {
                ...state,
                allFood : action.payload
            }
        case "ALLCAT":
            return {
                ...state,
                categories : action.payload
            }
        case "HR":
            return {
                ...state,
                Hrated : state.allFood.filter((food)=> food.ratings >= 4.8 ),
                Hdemand : state.allFood.filter((food)=>  food._id !== state.Hrated.map((fd)=>fd._id ) ), 
                Party : state.allFood.filter((food)=> PartyCategry.includes(food.CategoryName) )
            }
    
        default:
            return {...state};
    }
}
export default AllFoodReducer;