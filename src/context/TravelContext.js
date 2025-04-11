import React, {
	createContext,
	useContext,
	useReducer,
	useEffect
} from 'react';

const TravelContext = createContext();

const initialState = {
	entries: [],
	loading: false,
	error: null
};

function travelReducer(state, action) {
	switch (action.type) {
		case 'ADD_ENTRY':
			let list =  state.entries.filter(item => item.id!= action.payload.id);
			console.log(list);
			return {
				...state,
				entries: [...list, action.payload]
			};
		case 'DEL_ENTRY':
			return {
				...state,
				entries: state.entries.filter(item => item.id!== action.payload)
			};
		case 'SET_ENTRIES':
			return {
				...state,
				entries: action.payload
			};
		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload
			};
		case 'SET_ERROR':
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
}

export function TravelProvider({
	children
}) {
	const [state, dispatch] = useReducer(travelReducer, initialState);

	// Load entries from localStorage on mount
	useEffect(() => {
		const savedEntries = localStorage.getItem('travelEntries');
		if (savedEntries) {
			dispatch({
				type: 'SET_ENTRIES',
				payload: JSON.parse(savedEntries)
			});
		}
	}, []);

	// Save entries to localStorage when they change
	useEffect(() => {
		localStorage.setItem('travelEntries', JSON.stringify(state.entries));
	}, [state.entries]);

	return ( <
		TravelContext.Provider value = {
			{
				state,
				dispatch
			}
		} > {
			children
		} <
		/TravelContext.Provider>
	);
}

export function useTravelContext() {
	return useContext(TravelContext);
}