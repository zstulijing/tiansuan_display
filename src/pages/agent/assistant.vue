<script>
import Message from "@/pages/agent/message.vue";
import axios from "axios";
const baseURL = "http://localhost:8000";

export default {
  name: "Assistant",
  components: {Message},
  data() {
    return {
      message: '',
      enable: false,
      sessionId: window.crypto.randomUUID(),
      messageList: []
    }
  },
  methods: {
    send() {
      if (!this.enable) {
        return
      }
      this.invoke(this.message)
    },
    async stream(message) {
      this.messageList.push({ role: "User", content: message });

      const lastIndex = this.messageList.length;
      this.messageList.push({ role: "Assistant", content: "" });

      try {
        const response = await fetch(`${baseURL}/chat/stream`, {
          method: "POST",
          headers: { "Content-Type": "application json" },
          body: JSON.stringify({
            input: { input: message },
            config: { configurable: { session_id: this.sessionId } }
          })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          // 处理同一个 chunk 中包含多个 event 的情况
          const lines = chunk.split('\n');

          lines.forEach(line => {
            // 1. 检查是否是数据行
            if (line.startsWith('data: ')) {
              const jsonString = line.substring(6).trim();
              if (!jsonString || jsonString === '[DONE]') return;

              const payload = JSON.parse(jsonString);

              if (payload.output) {
                console.log(payload.output);
              }

            }
          });
        }
      } catch (error) {
      }
    },

    invoke(message) {
      this.messageList.push({
        role: "User",
        content: this.message
      })
      this.message = "";
      this.enable = false;
      axios.post(`${baseURL}/chat/invoke`, {
        input: {
          input: message
        },
        config: {
          configurable: {
            session_id: this.sessionId
          }
        }
      }).then(response => {
        const { metadata, output } = response.data;
        const content = output.output
        if (content) {
          this.messageList.push({
            role: "Assistant",
            content: content
          });
        }
      })
    },

    handleInput(e) {
      const el = this.$refs.textarea;
      // 重置高度，防止删除文字时高度不缩回
      el.style.height = 'auto';
      // 根据 scrollHeight 动态设置新高度
      el.style.height = `${el.scrollHeight}px`;
      this.enable = this.message.trim().length > 0;
    }
  }
}
</script>

<template>
  <div class="assistant">
    <div class="assistant__header">
      <div class="title">
        <p>BUPT Satellite O&M Agent</p>
      </div>

      <div class="setting">
        <img src="@/assets/images/agent/setting.png" alt="">
      </div>
    </div>
    <div class="assistant__content">
      <div class="messages" v-for="(item, index) in messageList" :key="index">
        <message :message="item"/>
      </div>
    </div>
    <div class="assistant__footer">
      <div class="assistant__footer__container">
        <textarea
            class="textarea"
            placeholder="输入指令..."
            ref="textarea"
            rows="1"
            @input="handleInput"
            v-model="message"
            @keydown.enter.prevent="send"
        />
        <div :class="{ button: true, enable: enable}" @click="send">
          <img src="@/assets/images/agent/send.png" alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="less">
.assistant {
  min-height: 100%;
  border-radius: 8px;
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;
  padding: 72px 28px;
  .assistant__header {
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    background: #E7E9EA;
    padding: 16px 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .title {
      p {
        font-size: 18px;
        line-height: 28px;
        font-weight: bold;
        color: #0b0b0b;
      }
    }
    .setting {
      img {
        width: 28px;
        height: 28px;
      }
    }

  }
  .assistant__content {
    .messages {
      margin-bottom: 20px;
    }
  }
  .assistant__footer {
    position: absolute;
    bottom: 16px;
    left: 0;
    width: 100%;
    .assistant__footer__container {
      position: relative;
      border: 1px #BBBBBB solid;
      box-sizing: border-box;
      min-height: 50px; // 初始最小高度
      max-height: 200px; // 最大高度，超过则内部滚动
      margin: 0 28px;
      background: #F2F2F2;
      border-radius: 20px;
      padding: 12px 24px;
      .textarea {
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        resize: none;

        font-size: 16px;
        line-height: 1.5;
        color: #333;
        padding: 0;
        display: block;
        height: 24px;
        overflow: hidden;
      }
      .button {
        position: absolute;
        right: 12px;
        bottom: 12px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #D5D5D5;
        img {
          width: 24px;
          height: 24px;
        }

        cursor: not-allowed;
      }
      .enable {
        cursor: pointer !important;
        background: #000;
      }
    }

  }
}
</style>