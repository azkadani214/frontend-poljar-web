<template>
  <div v-if="editor" class="border border-gray-300 overflow-hidden flex flex-col min-h-[400px]">
    <!-- Toolbar -->
    <div class="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
      <button
        v-for="action in actions"
        :key="action.name"
        type="button"
        @click="action.run"
        :class="[
          'p-1.5 rounded hover:bg-gray-200 transition-colors',
          action.isActive() ? 'bg-gray-200 text-primary-orange' : 'text-gray-600',
        ]"
        :title="action.name"
      >
        <component :is="action.icon" class="w-4 h-4" />
      </button>

      <div class="w-[1px] bg-gray-300 mx-1 self-stretch"></div>

      <button
        type="button"
        @click="addImage"
        class="p-1.5 rounded hover:bg-gray-200 text-gray-600"
        title="Insert Image"
      >
        <ImageIcon class="w-4 h-4" />
      </button>

      <button
        type="button"
        @click="setLink"
        :class="[
          'p-1.5 rounded hover:bg-gray-200',
          editor.isActive('link') ? 'bg-gray-200 text-primary-orange' : 'text-gray-600',
        ]"
        title="Toggle Link"
      >
        <LinkIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- Editor Content -->
    <editor-content
      :editor="editor"
      class="flex-1 prose prose-sm max-w-none p-4 focus:outline-none"
    />
  </div>
</template>

<script setup>
import { onBeforeUnmount, computed, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  Heading1Icon,
  Heading2Icon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  UndoIcon,
  RedoIcon,
  ImageIcon,
  LinkIcon,
  CodeIcon,
} from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const editor = new Editor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Link.configure({
      openOnClick: false,
    }),
    Image,
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.getHTML() === value
    if (isSame) return
    editor.commands.setContent(value, false)
  },
)

const actions = [
  {
    name: 'Bold',
    icon: BoldIcon,
    run: () => editor.chain().focus().toggleBold().run(),
    isActive: () => editor.isActive('bold'),
  },
  {
    name: 'Italic',
    icon: ItalicIcon,
    run: () => editor.chain().focus().toggleItalic().run(),
    isActive: () => editor.isActive('italic'),
  },
  {
    name: 'Underline',
    icon: UnderlineIcon,
    run: () => editor.chain().focus().toggleUnderline().run(),
    isActive: () => editor.isActive('underline'),
  },
  {
    name: 'Strike',
    icon: StrikethroughIcon,
    run: () => editor.chain().focus().toggleStrike().run(),
    isActive: () => editor.isActive('strike'),
  },
  {
    name: 'Code',
    icon: CodeIcon,
    run: () => editor.chain().focus().toggleCode().run(),
    isActive: () => editor.isActive('code'),
  },
  {
    name: 'Heading 1',
    icon: Heading1Icon,
    run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.isActive('heading', { level: 1 }),
  },
  {
    name: 'Heading 2',
    icon: Heading2Icon,
    run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.isActive('heading', { level: 2 }),
  },
  {
    name: 'Bullet List',
    icon: ListIcon,
    run: () => editor.chain().focus().toggleBulletList().run(),
    isActive: () => editor.isActive('bulletList'),
  },
  {
    name: 'Ordered List',
    icon: ListOrderedIcon,
    run: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.isActive('orderedList'),
  },
  {
    name: 'Blockquote',
    icon: QuoteIcon,
    run: () => editor.chain().focus().toggleBlockquote().run(),
    isActive: () => editor.isActive('blockquote'),
  },
  {
    name: 'Undo',
    icon: UndoIcon,
    run: () => editor.chain().focus().undo().run(),
    isActive: () => false,
  },
  {
    name: 'Redo',
    icon: RedoIcon,
    run: () => editor.chain().focus().redo().run(),
    isActive: () => false,
  },
]

function addImage() {
  const url = window.prompt('URL Gambar')
  if (url) {
    editor.chain().focus().setImage({ src: url }).run()
  }
}

function setLink() {
  const previousUrl = editor.getAttributes('link').href
  const url = window.prompt('URL Link', previousUrl)

  if (url === null) return
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<style>
.ProseMirror {
  min-height: 350px;
  outline: none !important;
}
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
