<script lang="ts">
  export let groupCode: string;
  import { getUserData, slimObject, slimObjects } from '../queries';
  import type { Person, Group } from '../stores/user';
  import { createForm } from 'svelte-forms-lib';
  import { imask } from 'svelte-imask';
  import * as yup from 'yup';
  import { slide } from 'svelte/transition';
  import Spinner from '../components/Spinner.svelte';
  import { useNavigate } from 'svelte-navigator';

  let loading = true;
  let doesNotExist = false;
  let navigate = useNavigate();

  type SlimPerson = Pick<
    Person,
    | 'title'
    | 'firstName'
    | 'lastName'
    | 'suffix'
    | 'email'
    | 'phone'
    | 'phoneAlerts'
    | 'mealConsideration'
    | 'highchair'
    | 'wheelchair'
    | 'saveTheDate'
  >;

  type TopLevelFormData = SlimPerson &
    Pick<
      Group,
      | 'paperInvite'
      | 'address'
      | 'address2'
      | 'city'
      | 'state'
      | 'zip'
      | 'country'
    > & {
      guests: Array<SlimPerson>;
    };

  const personValidation = yup.object().shape({
    title: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required()
  });

  const { form, errors, handleChange, handleSubmit, ...other } =
    createForm<TopLevelFormData>({
      initialValues: {
        title: '',
        firstName: '',
        lastName: '',
        suffix: '',
        email: '',
        phone: '',
        phoneAlerts: false,
        mealConsideration: '',
        highchair: false,
        wheelchair: false,
        saveTheDate: '',
        paperInvite: false,
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: undefined,
        country: '',
        guests: []
      },
      validationSchema: personValidation.shape({
        guests: yup.array().of(personValidation)
      }),
      onSubmit: (values) => {
        alert(JSON.stringify(values));
      }
    });

  getUserData(groupCode)
    .then(({ person, group, peopleInGroup }) => {
      $form = {
        ...slimObject(person, [
          'title',
          'firstName',
          'lastName',
          'suffix',
          'email',
          'phone',
          'phoneAlerts',
          'mealConsideration',
          'highchair',
          'wheelchair',
          'saveTheDate'
        ]),
        paperInvite: group.paperInvite,
        address: group.address,
        address2: group.address2,
        city: group.city,
        state: group.state,
        zip: group.zip,
        country: group.country,
        guests: slimObjects(peopleInGroup, [
          'title',
          'firstName',
          'lastName',
          'suffix',
          'email',
          'phone',
          'phoneAlerts',
          'mealConsideration',
          'highchair',
          'wheelchair',
          'saveTheDate'
        ])
      };
    })
    .catch((err) => {
      navigate('/saveTheDate');
    })
    .finally(() => {
      loading = false;
    });
</script>

<div class="box">
  {#if loading}
    <Spinner
      colorOuter="var(--color-paper)"
      colorCenter="var(--color-background)"
      colorInner="white"
    />
  {:else if doesNotExist}
    <h1 style:color="white">Does not exist</h1>
  {:else}
    <h1>{groupCode}</h1>
    <form on:submit={handleSubmit}>
      <div class="[ form__container ]">
        <div class="[ form__row ]">
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
        </div>
        <div class="[ form__row shrink ]">
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
        </div>
        <div class="[ form__row ">
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
        <div class="[ form__row ]">
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
              <span
                >{$errors.email.includes('required')
                  ? 'required'
                  : 'not a valid email'}</span
              >
            {/if}
          </div>
        </div>
        <div class="[ form__row ]">
          <div class="field">
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              required
              use:imask={{ mask: '(000) 000-0000', lazy: false }}
              on:change={handleChange}
              bind:value={$form.phone}
            />
            <label for="phone">Phone Number</label>
            {#if $errors.phone}
              <span>required</span>
            {/if}
          </div>
        </div>
        <div>
          <span>Select which apply:</span>
          <div class="[ buttongroup ]">
            <div class="button">
              <label>
                <input
                  type="checkbox"
                  name="wheelchair"
                  id="wheelchair"
                  on:change={handleChange}
                  bind:checked={$form.wheelchair}
                /><span>Wheelchair</span>
              </label>
            </div>
          </div>
        </div>

        {#each $form.guests as guest, g}
          <fieldset class="[ form__container ]">
            <legend>{g === 0 ? 'Companion' : `Additional Guest ${g}`}</legend>
            <div class="[ form__row ]">
              <div class="field">
                <select
                  name={`guests[${g}].title`}
                  id={`title${g}`}
                  required
                  data-option={$form.guests[g].title}
                  on:change={handleChange}
                  bind:value={$form.guests[g].title}
                >
                  <option />
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Ms">Miss</option>
                  <option value="Dr">Dr.</option>
                </select>
                <label for="title">Title</label>
              </div>
            </div>
            <div class="[ form__row shrink ]">
              <div class="field">
                <input
                  type="text"
                  name={`guests[${g}].firstName`}
                  id={`firstName${g}`}
                  placeholder="First Name"
                  required
                  on:change={handleChange}
                  bind:value={$form.guests[g].firstName}
                />
                <label for={`firstName${g}`}>First Name</label>
                <!--@ts-ignore-->
                {#if Object($errors.guests[g])?.firstName}
                  <span>required</span>
                {/if}
              </div>
              <div class="field">
                <input
                  type="text"
                  name={`guests[${g}].lastName`}
                  id={`lastName${g}`}
                  placeholder="Last Name"
                  required
                  on:change={handleChange}
                  bind:value={$form.guests[g].lastName}
                />
                <label for={`lastName${g}`}>Last Name</label>
                {#if Object($errors.guests[g])?.lastName}
                  <span>required</span>
                {/if}
              </div>
            </div>
            <div class="[ form__row ">
              <div class="field">
                <select
                  name={`guests[${g}].suffix`}
                  id={`suffix${g}`}
                  data-option={$form.guests[g].suffix}
                  on:change={handleChange}
                  bind:value={$form.guests[g].suffix}
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
            <div class="[ form__row ]">
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
            <div>
              <span>Select which apply:</span>
              <div class="[ buttongroup ]">
                <div class="button">
                  <label>
                    <input
                      type="checkbox"
                      name={`guests[${g}].wheelchair`}
                      id={`wheelchair${g}`}
                      on:change={handleChange}
                      bind:checked={$form.guests[g].wheelchair}
                    /><span>Wheelchair</span>
                  </label>
                </div>
                <div class="button">
                  <label>
                    <input
                      type="checkbox"
                      name={`guests[${g}].highchair`}
                      id={`highchair${g}`}
                      on:change={handleChange}
                      bind:checked={$form.guests[g].highchair}
                    /><span>Highchair</span>
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        {/each}

        <div>
          <input
            type="checkbox"
            name="paperInvite"
            id="address_switch"
            class="switch"
            on:change={handleChange}
            bind:checked={$form.paperInvite}
          />
          <label for="address_switch" />
          <span>Provide an address to recieve an invitation in the mail</span>
          {#if $form.paperInvite}
            <div
              class="[ form__container ]"
              style="padding-top: var(--spacing-3)"
              transition:slide|local
            >
              <div class="[ form__row ]">
                <div class="field">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="First Name"
                    required
                    on:change={handleChange}
                    bind:value={$form.address}
                  />
                  <label for="address">Address Line 1</label>
                  {#if $errors.address}
                    <span>required</span>
                  {/if}
                </div>
              </div>
              <div class="[ form__row ]">
                <div class="field">
                  <input
                    type="text"
                    name="address2"
                    id="address2"
                    placeholder="First Name"
                    required
                    on:change={handleChange}
                    bind:value={$form.address2}
                  />
                  <label for="address2">Address Line 2</label>
                  {#if $errors.address2}
                    <span>required</span>
                  {/if}
                </div>
              </div>
              <div class="[ form__row shrink]">
                <div class="field">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="State"
                    required
                    on:change={handleChange}
                    bind:value={$form.state}
                  />
                  <label for="state">State</label>
                  {#if $errors.state}
                    <span>required</span>
                  {/if}
                </div>
                <div class="field">
                  <input
                    type="text"
                    name="zip"
                    id="zip"
                    placeholder="Zip Code"
                    required
                    on:change={handleChange}
                    bind:value={$form.zip}
                  />
                  <label for="zip">Zip Code</label>
                  {#if $errors.zip}
                    <span>required</span>
                  {/if}
                </div>
              </div>
              <div class="[ form__row]">
                <div class="field">
                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    required
                    on:change={handleChange}
                    bind:value={$form.country}
                  />
                  <label for="country">Country</label>
                  {#if $errors.country}
                    <span>required</span>
                  {/if}
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!--

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
          <legend class="[ color__primary ]">Save The Date</legend>
          <p class="radio__option">
            <input type="radio" id="attend1" name="attend" checked />
            <label for="attend1"> I plan on attending </label>
          </p>
          <p class="radio__option">
            <input type="radio" id="attend3" name="attend" />
            <label for="attend3">
              I don't know if I'll be able to attend
            </label>
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
      </div>
    </form>
  {/if}
</div>

<style>
  .box {
    background-color: var(--color-primary);
    min-height: 100vh;
  }

  form {
    width: 100%;
    max-width: 50rem;
    margin: auto;
    background-color: white;
    padding: var(--spacing-5) var(--spacing-2);
  }
</style>
