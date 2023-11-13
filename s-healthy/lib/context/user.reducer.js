import AppLocal from "../lib/localStorage";

const InitState = {
  user: AppLocal.getUserStorage(),
  token: "",
  isLoading: false,
  isOpenModal: false,
  dataModal: null,
  cart: [],
  products: [],
  onClickConfirmModel: () => {},
  payProducts: [],
  notiAdmin: false,
  notificationsAdmin: [],
};
const KEY_CONTEXT_USER = {
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_LOADING: "SET_LOADING",
  CLEAR: "CLEAR",
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
  SET_CART: "SET_CART",
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_PRODUCTS_PAY: "SET_PRODUCTS_PAY",
  SET_ROOM_SOCKET: "SET_ROOM_SOCKET",
  SET_MESSAGES: "SET_MESSAGES",
  SET_NOTIADMIN: "SET_NOTIADMIN",
};
const UserReducer = (state, action) => {
  switch (action.type) {
    case KEY_CONTEXT_USER.CLEAR:
      return { ...InitState };

    case KEY_CONTEXT_USER.SET_USER:
      AppLocal.setUserStorage(action.payload);
      return { ...state, user: action.payload };

    case KEY_CONTEXT_USER.SET_TOKEN:
      AppLocal.setTokenStorage(action.payload);
      return { ...state, token: action.payload };
    case KEY_CONTEXT_USER.SET_CART:
      AppLocal.setCart(JSON.stringify(action.payload));
      return { ...state, cart: action.payload };
    case KEY_CONTEXT_USER.SET_PRODUCTS:
      AppLocal.setProducts(JSON.stringify(action.payload));
      return { ...state, products: action.payload };
    case KEY_CONTEXT_USER.SET_PRODUCTS_PAY:
      return { ...state, payProducts: action.payload };
    case KEY_CONTEXT_USER.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case KEY_CONTEXT_USER.SHOW_MODAL:
      return {
        ...state,
        isOpenModal: true,
        titleModel: action.payload.titleModel,
        contentModel: action.payload.contentModel,
        dataModal: action.payload.dataModal,
        typeModal: action.payload.typeModal,
        onClickConfirmModel: action.payload.onClickConfirmModel,
      };
    case KEY_CONTEXT_USER.HIDE_MODAL:
      return {
        ...state,
        isOpenModal: false,
        dataModal: null,
        onClickConfirmModel: () => {},
      };

    default:
  }
};
export { InitState, KEY_CONTEXT_USER };

export default UserReducer;
