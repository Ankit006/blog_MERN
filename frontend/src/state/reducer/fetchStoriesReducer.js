import { FETCH_STORIES, STORY_LOADING } from "../stateConstant.js";
import { initialState } from "../initialState.js";

const fetchStoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_STORIES:
			return {
				...state,
				allStories: {
					loading: false,
					story: action.payload,
				},
			};
		default:
			return state;
	}
};

export default fetchStoriesReducer;
