<script lang="ts">
  export let groupCode: string;
  import { getUserData, slimObject, slimObjects } from '../queries';
  import type { Person, Group } from '../stores/user';
  import { createForm } from 'svelte-forms-lib';
  import { imask, MaskedInput } from 'svelte-imask';
  import * as yup from 'yup';
  import { slide } from 'svelte/transition';
  import Spinner from '../components/Spinner.svelte';
  import { useNavigate } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import Title from '../components/Title.svelte';

  let loading = true;
  let doesNotExist = false;
  let approve = false;
  let phoneFocus;

  onMount(() => {
    phoneFocus = (tag: string) => () => {
      const el = document.querySelector<HTMLInputElement>(tag);
      el.focus();
      el.blur();
    };
  });
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
        saveTheDate: '',
        paperInvite: false,
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        guests: []
      },
      validationSchema: personValidation.shape({
        saveTheDate: yup.string().required(),
        address: yup.string().when('paperInvite', {
          is: true,
          then: yup.string().required('required')
        }),
        city: yup.string().when('paperInvite', {
          is: true,
          then: yup.string().required('required')
        }),
        state: yup.string().when('paperInvite', {
          is: true,
          then: yup.string().required('required')
        }),
        zip: yup.string().when('paperInvite', {
          is: true,
          then: yup.string().required('required')
        }),
        country: yup.string().when('paperInvite', {
          is: true,
          then: yup.string().required('required')
        }),
        guests: yup.array().of(personValidation)
      }),
      onSubmit: (values) => {
        console.log(values);
        approve = true;
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

  $: console.log($errors);
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
  {:else if approve}
    <div class="approve">
      <div>
        <img src="" alt="Address" />
        <span>
          {`${$form.title} ${$form.firstName}`}<br />
          {$form.address}<br />
          {#if !!$form.address2}
            {$form.address2}<br />
          {/if}
          {$form.city},{$form.state} ${$form.zip}<br />
          {$form.country}
        </span>
      </div>
      <div>
        <img src="" alt="" />
        <span>{$form.email}</span>
      </div>
      <div>
        <img src="" alt="" />
        <span>{$form.phone}</span>
      </div>
    </div>
  {:else}
    <div class="center">
      <Title><h1>Save The Date</h1></Title>
      <div id="text">
        Please fill in the following information (1 form per household) so we
        know where to send your formal invitation.

        <div id="whenwhere">
          <h2>March 25th, 2023</h2>
          <h4>Dripping Springs, TX</h4>
        </div>
      </div>

      <form on:submit={handleSubmit}>
        <div class="[ form__container ]">
          <div class="[ form__row ]">
            <div class="field">
              <select
                name="title"
                id="title"
                data-option={$form.title}
                on:change={handleChange}
                bind:value={$form.title}
              >
                <option />
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Sra.">Sra.</option>
                <option value="Ms.">Miss</option>
                <option value="Dr.">Dr.</option>
                <option value="Judge">Judge</option>
                <option value="Juez">Juez</option>
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
              <MaskedInput
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                options={{ mask: '(000) 000-0000', lazy: false }}
                on:change={handleChange}
                bind:value={$form.phone}
              />
              <label for="phone">Phone Number</label>
            </div>
          </div>

          <div class="[ form__row ]">
            <div class="field">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="First Name"
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
                on:change={handleChange}
                bind:value={$form.country}
              />
              <label for="country">Country</label>
              {#if $errors.country}
                <span>required</span>
              {/if}
            </div>
          </div>

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
          </div>

          <div class="[ form__row shrink ]">
            <div>
              <input
                type="checkbox"
                name="phoneAlerts"
                id="phoneAlerts"
                class="switch"
                on:change={handleChange}
                bind:checked={$form.phoneAlerts}
              />
              <label for="phoneAlerts" />
              <span>Recieve text-message alerts ?</span>
            </div>
            <div>
              We'll message you only for:
              <ul>
                <li>Event location and times</li>
                <li>Driving directions</li>
                <li>Alternate plans due to weather</li>
              </ul>
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
                    data-option={$form.guests[g].title}
                    on:change={handleChange}
                    bind:value={$form.guests[g].title}
                  >
                    <option />
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Sra.">Sra.</option>
                    <option value="Ms.">Miss</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Judge">Judge</option>
                    <option value="Juez">Juez</option>
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
                    name={`guests[${g}].email`}
                    id={`email${g}`}
                    placeholder="Email"
                    on:change={handleChange}
                    bind:value={$form.guests[g].email}
                  />
                  <label for="email">Email</label>
                  {#if Object($errors.guests[g])?.email}
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
                    name={`guests[${g}].phone`}
                    id={`phone${g}`}
                    placeholder="Phone Number"
                    use:imask={{ mask: '(000) 000-0000', lazy: false }}
                    on:change={handleChange}
                    bind:value={$form.guests[g].phone}
                  />
                  <label for="phone">Phone Number</label>
                </div>
              </div>

              <div class="[ form__row shrink ]">
                <div>
                  <input
                    type="checkbox"
                    name={`guests[${g}].phoneAlerts`}
                    id={`phoneAlerts${g}`}
                    class="switch"
                    on:change={handleChange}
                    bind:checked={$form.guests[g].phoneAlerts}
                  />
                  <label for={`phoneAlerts${g}`} />
                  <span>Recieve text-message updates ?</span>
                </div>
                <div>
                  We'll message you only for:
                  <ul>
                    <li>Event location and times</li>
                    <li>Driving directions</li>
                    <li>Alternate plans due to weather</li>
                  </ul>
                </div>
              </div>
            </fieldset>
          {/each}

          <fieldset>
            <legend class="[ color__primary ]">Save The Date</legend>
            <p class="radio__option">
              <input
                type="radio"
                id="attend1"
                name="attend"
                value="I plan on attending"
                bind:group={$form.saveTheDate}
              />
              <label for="attend1"> I plan on attending </label>
            </p>
            <p class="radio__option">
              <input
                type="radio"
                id="attend3"
                name="attend"
                value="I don't know if I'll be able to attend"
                bind:group={$form.saveTheDate}
              />
              <label for="attend3">
                I don't know if I'll be able to attend
              </label>
            </p>
            <p class="radio__option">
              <input
                type="radio"
                id="attend4"
                name="attend"
                value="I won't be able to attend"
                bind:group={$form.saveTheDate}
              />
              <label for="attend4"> I won't be able to attend </label>
            </p>
            <p class="[ inset ]" style="color: grey">
              <span style="text-decoration: underline">This is not an RSVP</span
              >, we'd just like to start gauging attendence.
            </p>
          </fieldset>
          <div class="grid">
            <input type="submit" />
          </div>
        </div>
      </form>
    </div>
  {/if}
</div>

<style>
  .center {
    width: 100%;
    max-width: 50rem;
    margin: auto;
    background-color: white;
    padding: var(--spacing-5) var(--spacing-2);
  }
  .box {
    background-color: var(--color-secondary);
    min-height: 100vh;
  }

  h1 {
    color: var(--color-primary);
    margin-top: 0;
  }

  #text {
    padding: var(--spacing-4) var(--spacing-6);
    background-color: var(--color-paper);
    color: var(--color-primary);
    text-align: justify;
    margin-bottom: var(--spacing-4);
    width: calc(100% + var(--spacing-4));
  }

  #whenwhere {
    background-color: var(--color-primary);
    color: white;
    padding: var(--spacing-1) var(--spacing-3);
    margin-top: var(--spacing-2);
    transform: translateX(-5rem);
    padding-left: 5rem;
    width: calc(100% + 5rem);
    text-align: left;
  }

  ul {
    list-style: circle;
  }

  @media (min-width: 55rem) {
    #text {
      width: calc(100% + 5vw);
    }

    #whenwhere {
      transform: translateX(-13%);
      padding-left: 13%;
    }
  }
</style>
