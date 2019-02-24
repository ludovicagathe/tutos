export const characto = {
  computed: {
    mixin_count_text() {
      return this.count_text + ` (${this.count_text.length})`;
    }
  }
}
