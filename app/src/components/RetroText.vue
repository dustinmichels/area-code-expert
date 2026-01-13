<script setup lang="ts">
// Logic can be added here if needed
</script>

<template>
  <div class="iphone-screen">
    <!-- Status Bar -->
    <div class="status-bar">
      <div class="signal">
        <div class="signal-dot filled"></div>
        <div class="signal-dot filled"></div>
        <div class="signal-dot filled"></div>
        <div class="signal-dot filled"></div>
        <div class="signal-dot"></div>
        <span class="carrier">AT&T</span>
        <span class="wifi-icon"></span>
      </div>
      <div class="time">10:51 PM</div>
      <div class="battery">
        <span class="battery-icon"></span>
      </div>
    </div>

    <!-- Header -->
    <div class="header">
      <button class="nav-btn back-btn">
        <div class="arrow-left"></div>
        Messages
      </button>
      <h1>Trent</h1>
      <button class="nav-btn edit-btn">Edit</button>
    </div>

    <!-- Contact Info / Content -->
    <div class="content">
      <div class="contact-info">
        <h2>To: <span class="phone-number">305-XXX-XXXX</span></h2>
      </div>

      <div class="message-container">
        <!-- Message Bubble -->
        <div class="bubble received">
          <p>Do you want to try to catch some gaters today?</p>
        </div>
      </div>
    </div>

    <!-- Footer / Input Area -->
    <div class="footer">
      <div class="camera-btn"></div>
      <div class="input-field"></div>
      <button class="send-btn">Send</button>
    </div>
  </div>
</template>

<style scoped>
/* Retro iOS Styles */
.iphone-screen {
  width: 100%;
  max-width: 375px; /* iPhone width */
  height: 667px; /* iPhone height */
  background-color: #d8dbe2; /* Light grey textured background */
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #000;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

/* Status Bar */
.status-bar {
  background: linear-gradient(to bottom, #dbe2e9, #b9c2ce);
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  font-size: 12px;
  border-bottom: 1px solid #7d8591;
}

.signal {
  display: flex;
  align-items: center;
  gap: 2px;
}

.signal-dot {
  width: 4px;
  height: 4px;
  border: 1px solid #444;
  border-radius: 50%;
}

.signal-dot.filled {
  background-color: #000;
}

.carrier {
  margin-left: 4px;
  font-weight: bold;
}

.time {
  font-weight: bold;
}

/* Header */
.header {
  background: linear-gradient(to bottom, #b0bccd 0%, #889bb3 50%, #8195af 51%, #6d84a2 100%);
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: white;
  border-bottom: 1px solid #56687e;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.header h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);
}

.nav-btn {
  background: linear-gradient(to bottom, #7a94b8 0%, #526f96 50%, #4a6890 51%, #2f4f7d 100%);
  border: 1px solid #324f73;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 12px;
  padding: 5px 10px;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

/* Content */
.content {
  flex: 1;
  background-color: #dbe2ed; /* Chat background */
  display: flex;
  flex-direction: column;
}

.contact-info {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}

.contact-info h2 {
  margin: 0;
  font-weight: normal;
  color: #888;
}

.phone-number {
  color: #000;
  font-weight: normal;
}

.message-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Bubbles */
.bubble {
  max-width: 75%;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 16px;
  line-height: 1.4;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
}

.bubble.received {
  background: linear-gradient(#e5e5ea, #dcdcdd);
  color: black;
  align-self: flex-start;
  border: 1px solid #c8c8cb;
  margin-left: 10px;
}

/* Pseudo-element for tail effect (simplified) */
.bubble.received::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: -8px;
  width: 20px;
  height: 20px;
  background-color: #dcdcdd;
  border-bottom-right-radius: 15px;
  z-index: -1;
}

.bubble p {
  margin: 0;
}

/* Footer */
.footer {
  height: 44px;
  background: linear-gradient(to bottom, #dbe2e9, #b9c2ce);
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-top: 1px solid #aeb5bf;
}

.input-field {
  flex: 1;
  height: 26px;
  background: white;
  border: 1px solid #aeb5bf;
  border-radius: 13px;
  margin: 0 10px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.send-btn {
  background: linear-gradient(to bottom, #86b4e6 0%, #468ccf 50%, #4081c0 51%, #1f64ad 100%);
  border: 1px solid #184a80;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 12px;
  padding: 5px 12px;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);
}
</style>
