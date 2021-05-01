<template>
  <table class="table p-4 bg-white shadow rounded-md">
    <thead>
      <tr>
        <th class="border-b-2 p-4 font-normal text-gray-900">
          Key
        </th>
        <th
          class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900"
        >
          Value
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, key) in list" :key="key" class="text-gray-700">
        <td class="border-b-2 p-4">{{ key }}</td>
        <td class="border-b-2 p-4">
          <c-table :list="value" v-if="isObject(value)"></c-table>
          <template v-else>
            {{ value }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
const isObject = (obj) => obj === Object(obj);
export default {
  name: "c-table",
  props: {
    list: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
  },
  methods: {
    isObject,
  },
};
</script>
<style scoped>
.table-bordered {
  border: 1px solid #ddd !important;
}

table caption {
  padding: 0.5em 0;
}

@media screen and (max-width: 767px) {
  table caption {
    display: none;
  }
}
</style>
