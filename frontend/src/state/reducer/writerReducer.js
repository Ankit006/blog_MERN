import { initialState } from "../initialState";
import { STORY_CHANGE, AUTHOR_CHANGE, HEADING_CHANGE } from "../stateConstant";

const writerReducer = (state = initialState, action) => {
	switch (action.type) {
		case HEADING_CHANGE:
			return {
				...state,
				headingData: action.payload,
			};
		case STORY_CHANGE:
			return {
				...state,
				storyData: action.payload,
			};
		case AUTHOR_CHANGE:
			return {
				...state,
				authorData: action.payload,
			};
		default:
			return state;
	}
};

export default writerReducer;
