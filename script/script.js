// Dom Elements
const addAnotherEle = document.querySelector('.lws-addMatch')
const matchesEle = document.querySelector('.all-matches')

//Name Variation
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const AddNew = 'add_match';
const RESET = 'reset';
const DELETE = 'delete';


//Initial Value
const initialValue = [
    {
        name: 'MATCH 1',
        result: 0,
        id: 1
    }
]

//Redux Reducer Function
const reduxReducer = (state = initialValue, action) => {
    switch (action.type) {
        case DELETE: {
            const filtaredState = state.filter(obj => obj.id !== action.payload.id);
            return filtaredState;
        }

        case AddNew: {
            const newMatch = {
                name: `MATCH ${state.length + 1}`,
                result: 0,
                id: (state.length + 1) + 1
            }

            return [...state, newMatch];
        }

        default: {
            return state;
        }
    }
};



//Create Store
const store = Redux.createStore(reduxReducer);


//Render
const render = () => {
    matchesEle.innerHTML = "";
    const state = store.getState();
    state.map(match => {
        matchesEle.innerHTML += `
        <div class="match">
                <div class="wrapper">
                    <button class="lws-delete" data-id=${match.id} onclick='handleDelete(${match.id})'>
                        <img src="./image/delete.svg" alt="" />
                    </button>
                    <h3 class="lws-matchName">${match.name}</h3>
                </div>
                <div class="inc-dec">
                    <form class="incrementForm">
                        <h4>Increment</h4>
                        <input type="number" name="increment" class="lws-increment" />
                    </form>
                    <form class="decrementForm">
                        <h4>Decrement</h4>
                        <input type="number" name="decrement" class="lws-decrement" />
                    </form>
                </div>
                <div class="numbers">
                    <h2 class="lws-singleResult">${match.result}</h2>
                </div>
            </div>
        `
    })
};
render();
store.subscribe(render);


//Event listeners
addAnotherEle.addEventListener('click', () => {
    store.dispatch({
        type: AddNew,
    });
})


const handleDelete = (id) => {
    store.dispatch({
        type: DELETE,
        payload: {
            id: id
        }
    })
}