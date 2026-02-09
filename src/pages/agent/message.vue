<script>
import MarkdownIt from 'markdown-it';
import 'github-markdown-css/github-markdown.css';

export default {
  name: "Message",
  props: {
    message: {
      type: Object,
      required: true,
      default: {}
    }
  },
  data() {
    return {
      md: new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true
      })
    }
  },
  methods: {
    renderedContent(content) {
      console.log(content)
      return this.md.render(content);
    }
  }
}
</script>

<template>
  <div class="message">
    <div class="user" v-if="message.role === 'User'">
      <div class="message__content">
        <p>{{ message.content }}</p>
      </div>
    </div>
    <div class="assistant" v-else>
      <div class="markdown-body" v-html="renderedContent(message.content)"></div>
    </div>
  </div>

</template>

<style scoped lang="less">
.markdown-body {
  word-break: break-word;
  line-height: 1.6;

}
.markdown-body :deep(pre) {
  background: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
.user {
  width: 100%;
  display: flex;
  justify-content: right;
  .message__content {
    max-width: 60%;
    background: #F2F2F2;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 8px 12px;
    p {
      font-size: 16px;
      line-height: 1.5;
    }
  }
}
</style>