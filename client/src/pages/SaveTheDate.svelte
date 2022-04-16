<script lang="ts">
  export let groupCode: string;
  import { createForm, ErrorMessage } from 'svelte-forms-lib';

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      title: '',
      firstName: '',
      lastName: '',
      suffix: '',
      email: ''
    },
    validate: (values) => {
      let errs = {};
      return errs;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    }
  });
</script>

<!-- <form action="">
    <div class="form__container">
        <div class="[ form__row ]" style="grid-template-columns: 1fr">
        <div class="field">
            <input name="name" type="search" placeholder="name" />
            <label for="name">Type your name</label>
            <div class="list__options">
            <div class="list__option">Option 1</div>
            <div class="list__option">Option 2</div>
            <div class="list__option">Option 3</div>
            <div class="list__option">Option 4</div>
            <div class="list__option">Option 5</div>
            </div>
        </div>
    </div>
</form> -->
<div class="box">
  <h1>{groupCode}</h1>

  <form on:submit={handleSubmit}>
    <fieldset>
      <legend class="[ color__primary ]">Contact</legend>
      <div class="[ form__container ]">
        <div class="[ form__row name__row ]">
          <div class="field">
            <select
              name="title"
              required
              id="title"
              data-option={$form.title}
              on:change={handleChange}
              bind:value={$form.title}
            >
              <option />
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Ms">Miss</option>
              <option value="Dr">Dr.</option>
            </select>
            <label for="title">Title</label>
          </div>
          <div class="field">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              required
              on:change={handleChange}
              bind:value={$form.firstName}
            />
            <label for="firstName">First Name</label>
            {#if $errors.firstName}
              <span>required</span>
            {/if}
          </div>
          <div class="field">
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              required
              on:change={handleChange}
              bind:value={$form.lastName}
            />
            <label for="lastName">Last Name</label>
            {#if $errors.lastName}
              <span>required</span>
            {/if}
          </div>
          <div class="field">
            <select
              id="suffix"
              name="suffix"
              data-option={$form.suffix}
              on:change={handleChange}
              bind:value={$form.suffix}
            >
              <option value="" />
              <option value="Sr">Sr.</option>
              <option value="Jr.">Jr.</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
            </select>
            <label for="suffix">Suffix</label>
          </div>
        </div>
        <div class="[ form__row ]" style="grid-template-columns: 1fr">
          <div class="field">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
              on:change={handleChange}
              bind:value={$form.email}
            />
            <label for="email">Email</label>
            {#if $errors.email}
              <span>required</span>
            {/if}
          </div>
        </div>

        <!-- <div class="[ form__row ]" style="grid-template-columns: 1fr">
                    <span class="additionalGuest">----- Additional Guest 1 -----</span>
                </div>
                <div
                    class="[ form__row ]"
                    style="grid-template-columns: 1fr 2fr 2fr"
                >
                <div class="field">
                    <select name="title" id="title" required >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Miss</option>
                    <option value="Dr.">Dr.</option>
                    </select>
                </div>
                <div class="field">
                    <input
                    name="firstName"
                    required
                    type="text"
                    placeholder="First Name"
                    />
                    <label for="firstName">First Name</label>
                    <span>First Name is required</span>
                </div>
                <div class="field">
                    <input
                    name="lastName"
                    required
                    type="text"
                    placeholder="Last Name"
                    />
                    <label for="lastName">Last Name</label>
                    <span>Last Name is required</span>
                </div>
                </div> -->
      </div>
    </fieldset>

    <!-- <input type="checkbox" name="address_switch" id="address_switch" checked>
        <label for="address_switch"></label>
        <span>Provide your address to recieve an invitation in the mail</span>
        <div id="address">
            <fieldset>
        <legend class="[ color__primary ]">Address</legend>
        <div class="form__container">
            <div class="[ form__row ]" style="grid-template-columns: 1fr">
            <div class="field">
                <input name="address1" type="text" placeholder="Address" />
                <label for="address1">Address</label>
                <span>Address is required</span>
            </div>
            <div class="[ form__row ]" style="grid-template-columns: 1fr">
                <div class="field">
                <input
                name="address2"
                type="text"
                placeholder="(Apt, Suite, extra )"
                />
                <label for="address2">(Apt, Suite, extra )</label>
                </div>
                
            </div>
            </div>

            <div class="[ form__row ]" style="grid-template-columns: 1fr 1fr">
            <div class="field">
                <input name="city" type="text" placeholder="City" />
                <label for="city">City</label>
                <span>City is required</span>
            </div>
            <div class="field">
                <input name="state" type="text" placeholder="State" />
                <label for="state">State</label>
                <span>State is required</span>
            </div>
            </div>
            <div class="[ form__row ]" style="grid-template-columns: 1fr 1fr">
            <div class="field">
                <input name="country" type="text" placeholder="Country" />
                <label for="country">Country</label>
                <span>Country is required</span>
            </div>
            <div class="field">
                <input name="zip" type="text" placeholder="Zip Code" />
                <label for="zip">Zip Code</label>
                <span>Zip Code is required</span>
            </div>
            </div>
        </div>
        </fieldset>
        </div>

        <div style="width: 100%; padding: 1rem"></div>
        <input type="checkbox" name="phone_switch" id="phone_switch">
        <label for="phone_switch"></label>
        <span>Would you like text-message alerts for event details and directions ?</span>
        <div id="phone">
        <fieldset>
        <legend class="[ color__primary ]">Message Alerts</legend>
        <div class="form__container">
            <div class="[ form__row ]" style="grid-template-columns: 1fr">
            <div class="field">
                <input name="phone" type="text" placeholder="Phone Number" />
                <label for="phone">Phone Number</label>
                <span>Phone Number is required</span>
            </div>
        </div>
        </fieldset>
        </div>
 -->
    <fieldset>
      <legend class="[ color__primary ]">Attendance</legend>
      <p class="radio__option">
        <input type="radio" id="attend1" name="attend" checked />
        <label for="attend1"> I plan on attending </label>
      </p>
      <p class="radio__option">
        <input type="radio" id="attend3" name="attend" />
        <label for="attend3"> I don't know if I'll be able to attend </label>
      </p>
      <p class="radio__option">
        <input type="radio" id="attend4" name="attend" />
        <label for="attend4"> I won't be able to attend </label>
      </p>
      <p class="[ inset ]" style="color: grey">
        <span style="text-decoration: underline">This is not an RSVP</span>,
        we'd just like to start gauging attendence.
      </p>
    </fieldset>
    <div class="grid">
      <input type="submit" />
    </div>
  </form>
</div>

<style>
  .name__row {
    grid-template-columns: 1fr;
  }
  @media (min-width: 748px) {
    .name__row {
      grid-template-columns: 1fr 2fr 2fr 1fr;
    }
  }
</style>
