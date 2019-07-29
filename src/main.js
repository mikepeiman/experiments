import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import VueLocalStorage from 'vue-localstorage'
// import "./registerServiceWorker";

Vue.config.productionTip = false;

const GRAPHCMS_API = 'https://api-uswest.graphcms.com/v1/cjry7p9c42zcv01i63qwszhh9/master'

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API}),
  cache: new InMemoryCache()
})
Vue.use(VueApollo)
Vue.use(VueLocalStorage)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
