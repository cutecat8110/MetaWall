"use strict";(self["webpackChunkmetawall"]=self["webpackChunkmetawall"]||[]).push([[849],{1267:function(t,s,e){e.r(s),e.d(s,{default:function(){return d}});var o=e(6768);const a={class:"posts-wall"};function n(t,s,e,n,r,u){const c=(0,o.g2)("SubNav"),l=(0,o.g2)("PostsNone"),h=(0,o.g2)("Posts");return(0,o.uX)(),(0,o.CE)("div",a,[(0,o.bF)(c),0==r.posts.length?((0,o.uX)(),(0,o.Wv)(l,{key:0})):(0,o.Q3)("",!0),((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(r.posts,(t=>((0,o.uX)(),(0,o.Wv)(h,{key:t._id,tempPost:t},null,8,["tempPost"])))),128))])}var r=e(2587),u=e(6678),c=e(5752),l={name:"PostsWallView",components:{Posts:r.A,PostsNone:u.A,SubNav:c.A},data(){return{posts:{}}},mounted(){this.getPosts()},watch:{$route(){"posts_wall"===this.$route.name&&this.getPosts()}},methods:{getPosts(){this.$store.commit("Load",!0);let t=new URLSearchParams(this.$route.query).toString();t&&(t=`?${t}`);const s=`https://metawall-backend-c89d.onrender.com/posts${t}`,{headers:e}=this.$store.state;this.$http.get(s,e).then((t=>{this.posts=t.data.posts})).catch((t=>{console.error(t)})).then((()=>{this.$store.commit("Load",!1)}))}}},h=e(1241);const i=(0,h.A)(l,[["render",n],["__scopeId","data-v-21a174d6"]]);var d=i}}]);
//# sourceMappingURL=849.7601c4e8.js.map