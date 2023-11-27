// Dom Elements
const addAnotherEle = document.querySelector('.lws-addMatch');
const matchesEle = document.querySelector('.all-matches');
const resetEle = document.querySelector('.lws-reset')

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
        case INCREMENT: {
            const updateScore = state.map(match => {
                if (match.id === +action.payload.id) {
                    return {
                        ...match,
                        result: +match.result + +action.payload.value
                    }
                } else {
                    return match;
                }
            })
            return updateScore;
        }

        case DECREMENT: {
            const updateScore = state.map(match => {
                if (match.id === action.payload.id) {
                    let result = +match.result - +action.payload.value;
                    if (result < 0) {
                        return {
                            ...match,
                            result: 0
                        }
                    }else{
                        return {
                            ...match,
                            result: result
                        }
                    }
                } else {
                    return match
                }
            })
            return updateScore;
        }
        case AddNew: {
            const newMatch = {
                name: `MATCH ${state.length + 1}`,
                result: 0,
                id: Math.random() * 100 + 10
            }

            return [...state, newMatch];
        }

        case DELETE: {
            const filtaredState = state.filter(obj => obj.id !== action.payload.id);
            return filtaredState;
        }

        case RESET: {
            for (let obj of state) {
                obj.result = 0;
            };
            return state;
        }

        default: {
            return state;
        }
    }
};



//Create Store
const store = Redux.createStore(reduxReducer);

onchange

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
                    <form class="incrementForm" onsubmit="handleIncrement(event, ${match.id})">
                        <h4>Increment</h4>
                        <input type="number" name="increment" class="lws-increment" />
                    </form>

                    <form class="decrementForm" onsubmit="handleDecrement(event, ${match.id})">
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
const handleIncrement = (event, id) => {
    event.preventDefault();
    const incrementValue = event.target.increment.value;
    store.dispatch({
        type: INCREMENT,
        payload: {
            id: id,
            value: incrementValue
        }
    })
}

const handleDecrement = (event, id) => {
    event.preventDefault();
    const decrementValue = event.target.decrement.value;
    store.dispatch({
        type: DECREMENT,
        payload: {
            id,
            value: decrementValue
        }
    })
}

addAnotherEle.addEventListener('click', () => {
    store.dispatch({
        type: AddNew,
    });
})

resetEle.addEventListener('click', () => {
    store.dispatch({
        type: RESET
    })
})

const handleDelete = (id) => {
    store.dispatch({
        type: DELETE,
        payload: {
            id: id
        }
    })
}