export const initialState = {
  headingData: "",
  storyData: "",
  authorData: "",
  allStories: {
    loading: true,
    story: "",
  },
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  accessToken: {
    status: false,
    token: "",
  },
  profileImage: {
    status: false,
    image: "",
  },
};
