<template>
  <div id="inputContainer">
	<div class="input-column">
		<h3>Screen Selection</h3>
		<label>Screen To Edit: </label>
		<select v-model="localData.config.startupScreen" @change="update">
		  <option value = "welcome">Welcome Screen</option>
		  <option value = "customServer">Custom Server</option>
		  <option value = "znc">ZNC</option>
		</select>
	</div>
    <div v-if="localData.config.startupScreen == 'welcome'">
		<div class="input-column">
			<h3>Custom content section</h3>
			<label>Greeting Text </label>
			  <input v-model="localData.config.startupOptions.greetingText"
			    @change="update" @keyup="update"
			    type='text'
			  />

	        <label>Button Text</label>
	          <input v-model="localData.config.startupOptions.buttonText"
	            @change="update" @keyup="update"
	            type='text'
	          />
		</div>
		<div class='input-column'>
			<h3>&nbsp;</h3>
	        <label>Info Content</label>
	          <input v-model="localData.config.startupOptions.infoContent"
	            @change="update" @keyup="update"
	            type='text'
	          />
		</div>

		<div class="input-column">
			<h3>Login Options </h3>
			<div class="checkbox-container">
				<label>Show Channel</label>
				<input v-model="localData.config.startupOptions.showChannel"
					@change="update" @keyup="update"
					type='checkbox'
				/>
			</div>

			<div class="checkbox-container">
				<label>Show Nick</label>
		        <input v-model="localData.config.startupOptions.showNick"
		        	@change="update" @keyup="update"
		            type='checkbox'
		        />
			</div>

			<div class="checkbox-container">
				<label>Show Password</label>
				<input v-model="localData.config.startupOptions.showPassword"
					@change="update" @keyup="update"
					type='checkbox'
				/>
			</div>

			<div class="checkbox-container">
				<label>Recaptcha</label>
				<input v-model="localData.config.startupOptions.recaptcha"
					@change="update" @keyup="update"
					type='checkbox'
				/>
			</div>
		</div>
    </div>

    <div v-else-if="localData.config.startupScreen == 'customServer'">
		<div class='input-column'>
			<h3> Custom content section </h3>
			<label>Button Text</label>
			<input v-model="localData.config.startupOptions.buttonText"
			@change="update" @keyup="update"
			type='text'
			/>

			<label>Greeting Text</label>
			<input v-model="localData.config.startupOptions.greetingText"
			@change="update" @keyup="update"
			type='text'
			/>
		</div>

		<div class='input-column'>
			<h3> Direct Options </h3>
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
			<h3>&nbsp;</h3>
			<label>gecos</label>
	        <input v-model="localData.config.startupOptions.gecos"
	          @change="update" @keyup="update"
	          type='text'
	        />
		</div>
    </div>

    <div v-else-if="localData.config.startupScreen == 'znc'">
		<div class='input-column'>
			<h3>Custom content section</h3>
			<label>Greeting Text</label>
			<input v-model="localData.config.startupOptions.greetingText"
			@change="update" @keyup="update"
			type='text'
			/>

		  	<label>Button Text</label>
			<input v-model="localData.config.startupOptions.buttonText"
			@change="update" @keyup="update"
			type='text'
			/>
		</div>
		<div class="input-column">
			<h3>&nbsp;</h3>
			<label>Info Content</label>
			<input v-model="localData.config.startupOptions.infoContent"
			@change="update" @keyup="update"
			type='text'
			/>
		</div>
    </div>
    <!--
      <div v-for="field in ZNCfields" :key="field">
        <label><div class="label">{{field.name}}</div>
        <input :type="field.type" @change="update" @keyup="update">
        </label><br>
      </div>
    -->
  </div>
</template>

<script>
export default {
  name: 'StartupScreen',
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
