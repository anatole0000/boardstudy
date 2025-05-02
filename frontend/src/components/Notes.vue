<template>
  <div class="notes">
    <h2>🧠 Notes or Concepts</h2>

    <form @submit.prevent="saveNote" class="note-form">
      <input
        v-model="note.title"
        placeholder="Note title"
        required
        class="note-title-input"
      />
      <textarea
        v-model="note.content"
        placeholder="Content..."
        class="note-content-input"
      ></textarea>
      <div class="tag-input-container">
        <input
          v-model="tagInput"
          @keyup.enter.prevent="addTag"
          placeholder="Add tag and press enter"
          class="tag-input"
        />
        <div class="tags">
          <span v-for="(tag, i) in note.tags" :key="i" class="tag">
            {{ tag }} <button @click.prevent="removeTag(i)" class="tag-remove-button">x</button>
          </span>
        </div>
      </div>
      <button type="submit" class="save-button">{{ editingId ? "Update" : "Add" }}</button>
    </form>

    <div v-for="n in notes" :key="n._id" class="note-card">
      <h3>{{ n.title }}</h3>
      <p>{{ n.content }}</p>
      <small>Tags: {{ n.tags.join(', ') }}</small>
      <div class="note-actions">
        <button @click="editNote(n)" class="edit-button">✏️ Edit</button>
        <button @click="deleteNote(n._id)" class="delete-button">🗑 Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      notes: [],
      note: { title: '', content: '', tags: [] },
      tagInput: '',
      editingId: null,
    };
  },
  async mounted() {
    const res = await api.get('/notes');
    this.notes = res.data;
  },
  methods: {
    async saveNote() {
      if (this.editingId) {
        const res = await api.put(`/notes/${this.editingId}`, this.note);
        const index = this.notes.findIndex(n => n._id === this.editingId);
        this.notes[index] = res.data;
        this.editingId = null;
      } else {
        const res = await api.post('/notes', this.note);
        this.notes.unshift(res.data);
      }
      this.note = { title: '', content: '', tags: [] };
      this.tagInput = '';
    },
    editNote(note) {
      this.note = { ...note };
      this.editingId = note._id;
    },
    async deleteNote(id) {
      await api.delete(`/notes/${id}`);
      this.notes = this.notes.filter(n => n._id !== id);
    },
    addTag() {
      if (this.tagInput && !this.note.tags.includes(this.tagInput)) {
        this.note.tags.push(this.tagInput.trim());
        this.tagInput = '';
      }
    },
    removeTag(index) {
      this.note.tags.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* General Form Styling */
.note-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.note-title-input,
.note-content-input,
.tag-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.note-title-input {
  font-weight: bold;
  font-size: 1.2rem;
}

.note-content-input {
  min-height: 100px;
}

.save-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #45a049;
}

/* Tag Input Styles */
.tag-input-container {
  display: flex;
  flex-direction: column;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #f0f0f0;
  padding: 4px 10px;
  border-radius: 4px;
  display: inline-block;
  font-size: 0.9rem;
}

.tag-remove-button {
  background: none;
  border: none;
  color: #e53935;
  font-weight: bold;
  cursor: pointer;
  padding-left: 6px;
}

/* Notes List Styling */
.note-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.note-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.note-actions {
  margin-top: 12px;
}

.edit-button,
.delete-button {
  padding: 6px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button {
  background-color: #f1c40f;
}

.delete-button {
  background-color: #e74c3c;
}

.edit-button:hover {
  background-color: #f39c12;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
