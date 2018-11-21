<template>
    <div id="sidebar-wrapper" class="sidebar-toggle">
			<ul class="sidebar-nav">
		    	<li>
		      		<a href="#item1">Public</a>
		    	</li>
		    	<li>
		      		<a href="#item2">Tags</a>
		    	</li>
		    	<li>
		      		<a href="#item3">Users</a>
		    	</li>
		  	</ul>
		</div>
</template>

<script>
export default {
    name: 'sidebar'

}
</script>

<style>

#sidebar-wrapper {
  top: 52px;
  left: -200px;
  width: 200px;
  background-color: #868e96;
  color: white;
  position: fixed;
  height: 100%;
  z-index: 1;
}
.sidebar-nav {
  position: absolute;
  top: 0;
  margin: 0;
  padding: 0;
  width: 240px;
  list-style: none;
}
.sidebar-nav li {
  text-indent: 20px;
  line-height: 50px;
}
.sidebar-nav li a {
  color: white;
  display: block;
  text-decoration: none;
}
.sidebar-nav li a:hover {
  background: rgba(255,255,255,0.25);
  color: white;
  text-decoration: none;
}
.sidebar-nav li a:active, .sidebar-nav li a:focus {
  text-decoration: none;
}
#sidebar-wrapper.sidebar-toggle {
  transition: all 0.3s ease-out;
  margin-left: -200px;
}
@media (min-width: 768px) {
  #sidebar-wrapper.sidebar-toggle {
    transition: 0s;
    left: 200px;
  }
}

</style>
