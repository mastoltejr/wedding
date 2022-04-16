<script lang="ts">
  import AutoComplete from 'simple-svelte-autocomplete';
  import { navigate } from 'svelte-navigator';
  import { getNames } from '../queries';
  let selectedUser;

  if (!!selectedUser) {
    alert(selectedUser);
  }
</script>

<AutoComplete
  searchFunction={getNames}
  bind:selectedItem={selectedUser}
  labelFieldName="fullName"
  valueFieldName="code"
  delay={200}
  localFiltering={false}
  placeholder="Search the Guest List..."
  showLoadingIndicator={true}
  noInputStyles={true}
  inputClassName="userQuery"
  dropdownClassName="stolteDropdownClassName"
  required
  hideArrow={true}
/>
