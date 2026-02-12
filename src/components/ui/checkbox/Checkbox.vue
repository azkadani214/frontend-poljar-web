<script setup>
import { computed } from "vue";
import { CheckboxRoot, CheckboxIndicator, useForwardPropsEmits } from "radix-vue";
import { Check } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps({
  modelValue: { type: [Boolean, Array], default: false },
  checked: { type: [Boolean, String], default: undefined },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  name: { type: String, default: undefined },
  value: { type: String, default: "on" },
  id: { type: String, default: undefined },
  asChild: { type: Boolean, default: false },
  as: { type: null, default: undefined },
  class: { type: null, default: undefined },
});

const emits = defineEmits(["update:modelValue", "update:checked"]);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        props.class,
      )
    "
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <slot>
        <Check class="h-4 w-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
