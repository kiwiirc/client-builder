<template>
  <div id="inputContainer">
	<div class="input-column">
		<h3>Network Selection</h3>
		<label>Network Type </label>
		<select v-model="localData.config.networkType" @change="update">
		  <option value = "default">Standard</option>
		  <option value = "custom">Custom Server</option>
		  <option value = "znc">ZNC</option>
		</select>
	</div>
    <div v-if="localData.config.networkType == 'default'">
		<div class="input-column">
			<h3>IRC Network</h3>
			<label>Server</label>
			<input v-model="localData.config.startupOptions.server"
				@change="update" @keyup="update"
				type='text'
			/>

			<label>Port</label>
			<input v-model="localData.config.startupOptions.port"
				@change="update" @keyup="update"
				type='text'
			/>
		</div>

		<div class="input-column">
			<h3>&nbsp;</h3>

			<label>Encoding</label>
			<input v-model="localData.config.startupOptions.encoding"
				@change="update" @keyup="update"
				type='text'
			/>

			<div class="checkbox-container">
				<label class="tlsLabel">TLS</label>
				  <input v-model="localData.config.startupOptions.tls"
					@change="update" @keyup="update"
					type='checkbox'
				  />
			</div>
		</div>

		<div class='input-column'>
			<h3>&nbsp;</h3>

			<label>Nick</label>
			<input v-model="localData.config.startupOptions.nick"
				@change="update" @keyup="update"
				type='text'
			/>

			<label>Channel</label>
			<input v-model="localData.config.startupOptions.channel"
				@change="update" @keyup="update"
				type='text'
			/>
		</div>
    </div>

    <div v-else-if="localData.config.networkType == 'custom'">
		<div class='input-column'>
			<h3> Direct Options </h3>
			<label>gecos</label>
			<input v-model="localData.config.startupOptions.gecos"
			  @change="update" @keyup="update"
			  type='text'
			/>
			<label>Direct Path</label>
			<input v-model="localData.config.startupOptions.directPath"
			  @change="update" @keyup="update"
			  type='text'
			/>

			<div class='checkbox-container'>
				<label>Direct</label>
				<input v-model="localData.config.startupOptions.direct"
				  @change="update" @keyup="update"
				  type='checkbox'
				/>
			</div>
		</div>

		<div class='input-column'>
			<h3>IRC Network </h3>
			<label>Server</label>
			<input v-model="localData.config.startupOptions.server"
	          @change="update" @keyup="update"
	          type='text'
	        />

			<label>Port</label>
			<input v-model="localData.config.startupOptions.port"
			  @change="update" @keyup="update"
			  type='text'
			/>
		</div>

		<div class='input-column'>
			<h3>&nbsp;</h3>
			<label>Encoding</label>
			<input v-model="localData.config.startupOptions.encoding"
			@change="update" @keyup="update"
			type='text'
			/>

			<div class="checkbox-container">
				<label>TLS</label>
				<input v-model="localData.config.startupOptions.tls"
				  @change="update" @keyup="update"
				  type='checkbox'
				/>
			</div>
		</div>

		<div class='input-column'>
			<h3>&nbsp;</h3>
			<label>Channel</label>
	        <input v-model="localData.config.startupOptions.channel"
	          @change="update" @keyup="update"
	          type='text'
	        />

			<label>Nick</label>
	        <input v-model="localData.config.startupOptions.nick"
	          @change="update" @keyup="update"
	          type='text'
	        />

			<label>Password</label>
	        <input v-model="localData.config.startupOptions.password"
	          @change="update" @keyup="update"
	          type='password'
	        />
		</div>
    </div>

    <div v-else-if="localData.config.networkType == 'znc'">
		<div class='input-column'>
			<h3>Network Settings</h3>
			<label>Server</label>
			<input v-model="localData.config.startupOptions.server"
			  @change="update" @keyup="update"
			  type='text'
			/>
			<label>Network</label>
			<input v-model="localData.config.startupOptions.network"
			@change="update" @keyup="update"
			type='text'
			/>
		</div>

		<div class='input-column'>
			<h3>&nbsp;</h3>
			<label>User Name</label>
			<input v-model="localData.config.startupOptions.userName"
			  @change="update" @keyup="update"
			  type='text'
			/>

			<label>Password</label>
			<input v-model="localData.config.startupOptions.password"
			@change="update" @keyup="update"
			type='password'
			/>
		</div>

		<div class='input-column'>
			<h3>&nbsp;</h3>

			<label>Port</label>
			<input v-model="localData.config.startupOptions.port"
			  @change="update" @keyup="update"
			  type='text'
			/>
		</div>

		<div class='input-column'>
			<h3>&nbsp;</h3>
			<div class='checkbox-container'>
				<label>Show Network</label>
				<input v-model="localData.config.startupOptions.showNetwork"
				@change="update" @keyup="update"
				type='checkbox'
				/>
			</div>

			<div class='checkbox-container'>
		        <label>Show User</label>
				<input v-model="localData.config.startupOptions.showUser"
				@change="update" @keyup="update"
				type='checkbox'
				/>
			</div>

			<div class='checkbox-container'>
		        <label>Show Pass</label>
				<input v-model="localData.config.startupOptions.showPass"
				@change="update" @keyup="update"
				type='checkbox'
				/>
			</div>

			<div class='checkbox-container'>
				<label>TLS</label>
				<input v-model="localData.config.startupOptions.tls"
				  @change="update" @keyup="update"
				  type='checkbox'
				/>
			</div>
		</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetworkSettings',
  props: ['localData'],
  methods: {
    update: function () {
      this.$emit('setConfig', 1)
    }
  }
}
</script>

<style scoped>
select{
  position:relative;
  font-size:1.25em;
  text-align: center;
  margin-left:auto;
  margin-right:auto;
}
#inputContainer{
  margin:10px;
  line-height:2.5em;
}
.label{
  width:115px;
  text-align:right;
  display: inline-block;
}
.tlsLabel{
  width:25px;
  text-align:right;
  display: inline-block;
}
</style>
