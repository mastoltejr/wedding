<script lang="ts">
  export let groupCode: string;
  import { sendEmail, slimObject, slimObjects } from '../queries';
  import { getUserData, Person, Group, user } from '../stores/user';
  import { createForm } from 'svelte-forms-lib';
  import { imask, MaskedInput } from 'svelte-imask';
  import * as yup from 'yup';
  import Spinner from '../components/Spinner.svelte';
  import { useNavigate, useFocus } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import Title from '../components/Title.svelte';
  import { fly } from 'svelte/transition';

  const registerFocus = useFocus();
  let loading = true;
  let doesNotExist = false;
  let approve = false; // TODO false
  let showErrors = true;
  let finished = false;
  let errorCount = 0;

  onMount(() => {
    getUserData(groupCode).catch(() => {
      navigate('/saveTheDate');
    });
  });
  let navigate = useNavigate();

  type SlimPerson = Pick<
    Person,
    | 'code'
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
      'eInvite' | 'address' | 'address2' | 'city' | 'state' | 'zip' | 'country'
    > & {
      guests: Array<SlimPerson>;
    };

  const personValidation = yup.object().shape({
    code: yup.string().required(),
    title: yup.string(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    suffix: yup.string(),
    email: yup.string().email().required(),
    phoneAlerts: yup.boolean(),
    phone: yup.string().when('phoneAlerts', {
      is: true,
      then: yup.string().required('Phone Number is required')
    }),
    saveTheDate: yup.string().required()
  });

  const { form, errors, isValid, handleChange, handleSubmit, ...other } =
    createForm<TopLevelFormData>({
      initialValues: {
        code: '',
        title: '',
        firstName: '',
        lastName: '',
        suffix: '',
        email: '',
        phone: '',
        phoneAlerts: false,
        saveTheDate: '',
        eInvite: false,
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        guests: []
      },
      validationSchema: personValidation.shape({
        eInvite: yup.boolean(),
        address: yup.string().required('Address is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        zip: yup.string().required('Zip Code is required'),
        country: yup.string(), //.required('Country is required'),
        guests: yup.array().of(
          yup.object().shape({
            code: yup.string().required(),
            title: yup.string(),
            firstName: yup.string(),
            lastName: yup.string(),
            suffix: yup.string(),
            email: yup.string().email(),
            phoneAlerts: yup.boolean(),
            phone: yup.string().when('phoneAlerts', {
              is: true,
              then: yup.string().required('Phone Number is required')
            }),
            saveTheDate: yup.string().required()
          })
        ) //.of(personValidation)
      }),
      onSubmit: (values) => {
        if (isValid) {
          approve = true;
          user.update((data) => ({
            person: {
              ...data.person,
              ...slimObject($form, [
                'code',
                'title',
                'firstName',
                'lastName',
                'suffix',
                'email',
                'phone',
                'phoneAlerts',
                'saveTheDate'
              ]),
              saveTheDateUpdated: new Date(),
              lastUpdated: new Date()
            },
            group: {
              ...data.group,
              ...slimObject($form, [
                'eInvite',
                'address',
                'address2',
                'city',
                'state',
                'zip',
                'country'
              ]),
              lastUpdated: new Date()
            },
            peopleInGroup: data.peopleInGroup.reduce(
              (group, person) => [
                ...group,
                {
                  ...person,
                  ...slimObject(
                    $form.guests.find((g) => g.code === person.code)!,
                    [
                      'code',
                      'title',
                      'firstName',
                      'lastName',
                      'suffix',
                      'email',
                      'phone',
                      'phoneAlerts',
                      'saveTheDate'
                    ]
                  ),
                  saveTheDateUpdated: new Date(),
                  lastUpdated: new Date()
                }
              ],
              []
            )
          }));
          navigate('#approveStep2');
        } else {
          showErrors = true;
        }
      }
    });

  user.subscribe((data) => {
    if (data.person !== undefined) {
      form.set({
        code: data.person.code,
        title: data.person.title ?? '',
        firstName: data.person.firstName ?? '',
        lastName: data.person.lastName ?? '',
        suffix: data.person.suffix ?? '',
        email: data.person.email ?? '',
        phone: data.person.phone ?? '',
        phoneAlerts: data.person.phoneAlerts ?? false,
        saveTheDate: data.person.saveTheDate ?? '',
        eInvite: data.group.eInvite ?? false,
        address: data.group.address ?? '',
        address2: data.group.address2 ?? '',
        city: data.group.city ?? '',
        state: data.group.state ?? '',
        zip: data.group.zip ?? '',
        country: data.group.country ?? '',
        guests: data.peopleInGroup.map((p) => ({
          code: p.code,
          title: p.title ?? '',
          firstName: p.firstName ?? '',
          lastName: p.lastName ?? '',
          suffix: p.suffix ?? '',
          email: p.email ?? '',
          phone: p.phone ?? '',
          phoneAlerts: p.phoneAlerts ?? false,
          saveTheDate: p.saveTheDate ?? ''
        }))
      });
      loading = false;
    }
  });

  const finalApprove = () => {
    // submit form to google sheets
    // user.update((data) => ({
    //   person: {
    //     ...data.person,
    //     ...slimObject($form, [
    //       'code',
    //       'title',
    //       'firstName',
    //       'lastName',
    //       'suffix',
    //       'email',
    //       'phone',
    //       'phoneAlerts',
    //       'saveTheDate'
    //     ]),
    //     saveTheDateUpdated: new Date(),
    //     lastUpdated: new Date()
    //   },
    //   group: {
    //     ...data.group,
    //     ...slimObject($form, [
    //       'eInvite',
    //       'address',
    //       'address2',
    //       'city',
    //       'state',
    //       'zip',
    //       'country'
    //     ]),
    //     lastUpdated: new Date()
    //   },
    //   peopleInGroup: data.peopleInGroup.reduce(
    //     (group, person) => [
    //       ...group,
    //       {
    //         ...person,
    //         ...slimObject($form.guests.find((g) => g.code === person.code)!, [
    //           'code',
    //           'title',
    //           'firstName',
    //           'lastName',
    //           'suffix',
    //           'email',
    //           'phone',
    //           'phoneAlerts',
    //           'saveTheDate'
    //         ]),
    //         saveTheDateUpdated: new Date(),
    //         lastUpdated: new Date()
    //       }
    //     ],
    //     []
    //   )
    // }));
    finished = true;
    sendEmail($user, 'saveTheDate');
    navigate('#backToHomeStep3');
  };

  const countErrors = (obj: Object): number => {
    return Object.values(obj).reduce<number>(
      (t, o) =>
        t +
        (Array.isArray(o)
          ? o.reduce<number>((tt, oo) => tt + countErrors(oo), 0)
          : Number(!!o)),
      0
    );
  };

  const hideErrorBox = () => {
    showErrors = false;
  };

  const backToEdit = () => {
    approve = false;
    navigate('#whenwhere');
  };

  $: errorCount = countErrors($errors);
</script>

<div class="box">
  <div class="center" use:registerFocus>
    <Title><h1>Save The Date</h1></Title>
    <div id="text">
      Please fill in the following information (1 form per household) so we know
      where to send your formal invitation.

      <div id="whenwhere">
        <h2>March 25th, 2023</h2>
        <h4>Dripping Springs, TX</h4>
      </div>
    </div>
    {#if loading}
      <Spinner
        colorOuter="var(--color-paper)"
        colorCenter="var(--color-background)"
        colorInner="white"
      />
    {:else if doesNotExist}
      <h1 style:color="white">Does not exist</h1>
    {:else if finished}
      <h2
        use:registerFocus
        id="backToHomeStep3"
        class="color__primary"
        style="text-align: center;text-transform: uppercase; font-weight: 400"
      >
        Thanks for filling that out!
      </h2>
      <div class="approve">
        {#if $form.saveTheDate === 'Yes'}
          <p>We look forward to seeing you at our wedding!</p>
        {:else if $form.saveTheDate === 'Maybe'}
          <p>
            We hope to see you at our wedding, but we know life happens...<br />
            If something changes, please update your save the date to let us know!
          </p>
        {:else}
          <p>
            We're sad to see you can't make it to our wedding, but we know life
            happens...<br />
            If something changes, please update your save the date to let us know!
          </p>
        {/if}
        <button id="looksGood" on:click={() => navigate('/')}
          >Back to Home</button
        >
      </div>
    {:else if approve}
      <h2
        use:registerFocus
        class="color__primary"
        id="approveStep2"
        style="text-align: center;text-transform: uppercase; font-weight: 400"
      >
        Take a quick look & make sure everything's right.
      </h2>
      <div class="approve">
        <div>
          <img src="/images/homeIcon.png" alt="Address" />
          <span>
            {`${$form.title} ${$form.firstName} ${$form.lastName} ${$form.suffix}`}<br
            />
            {$form.address}<br />
            {#if !!$form.address2}
              {$form.address2}<br />
            {/if}
            {$form.city},{$form.state}
            {$form.zip}<br />
            {$form.country}
          </span>
        </div>
        <div>
          <img src="/images/mailIcon.png" alt="Email & Phone" />
          <span>{$form.email}</span>
        </div>
        <div>
          <img src="/images/phoneIcon.png" alt="Email & Phone" />
          <span>{$form.phone}</span>
        </div>
        {#if $form.guests.length > 0}
          <div>
            <img src="/images/heartIcon.png" alt="Companion" />
            {#each $form.guests as guest}
              {`${guest.title} ${guest.firstName} ${guest.lastName} ${guest.suffix}`}<br
              />
            {/each}
          </div>
        {/if}
        <button id="looksGood" on:click={finalApprove}>Looks Good!</button>
        <button id="backEdit" on:click={backToEdit}>Go back and edit</button>
      </div>
    {:else}
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
                <option value="Miss">Miss</option>
                <option value="Ms.">Ms.</option>
                <option value="Sr.">Sr.</option>
                <option value="Sra.">Sra.</option>
                <option value="Dr.">Dr.</option>
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
                {...{ error: String(!!$errors.firstName) }}
                on:change={handleChange}
                bind:value={$form.firstName}
              />
              <label for="firstName">First Name</label>
              {#if $errors.firstName}
                <span id="error">First Name is required</span>
              {/if}
            </div>
            <div class="field">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                {...{ error: String(!!$errors.lastName) }}
                on:change={handleChange}
                bind:value={$form.lastName}
              />
              <label for="lastName">Last Name</label>
              {#if $errors.lastName}
                <span id="error">Last Name is required</span>
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
                {...{ error: String(!!$errors.email) }}
                on:change={handleChange}
                bind:value={$form.email}
              />
              <label for="email">Email</label>
              {#if $errors.email}
                <span id="error">Valid email is required</span>
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
                {...{ error: String(!!$errors.phone) }}
                on:change={handleChange}
                bind:value={$form.phone}
              />
              <label for="phone">Phone Number</label>
              {#if $errors.phone}
                <span id="error">Phone Number is required</span>
              {/if}
            </div>
          </div>

          <div class="[ form__row ]">
            <div class="field">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                {...{ error: String(!!$errors.address) }}
                on:change={handleChange}
                bind:value={$form.address}
              />
              <label for="address">Address Line 1</label>
              {#if $errors.address}
                <span id="error">Address is required</span>
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
            </div>
          </div>
          <div class="[ form__row ]">
            <div class="field">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="First Name"
                on:change={handleChange}
                bind:value={$form.city}
              />
              <label for="city">City</label>
            </div>
          </div>
          <div class="[ form__row shrink]">
            <div class="field">
              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                {...{ error: String(!!$errors.state) }}
                on:change={handleChange}
                bind:value={$form.state}
              />
              <label for="state">State</label>
              {#if $errors.state}
                <span id="error">State is required</span>
              {/if}
            </div>
            <div class="field">
              <input
                type="text"
                name="zip"
                id="zip"
                placeholder="Zip Code"
                {...{ error: String(!!$errors.zip) }}
                on:change={handleChange}
                bind:value={$form.zip}
              />
              <label for="zip">Zip Code</label>
              {#if $errors.zip}
                <span id="error">Zip Code is required</span>
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
                {...{ error: String(!!$errors.country) }}
                on:change={handleChange}
                bind:value={$form.country}
              />
              <label for="country">Country</label>
              {#if $errors.country}
                <span id="error">Country is required</span>
              {/if}
            </div>
          </div>

          <div>
            <input
              type="checkbox"
              name="eInvite"
              id="evite_switch"
              class="switch"
              on:change={handleChange}
              bind:checked={$form.eInvite}
            />
            <label for="evite_switch" />
            <span
              class="text"
              style="color: {$form.eInvite ? 'var(--color-primary' : 'grey'}"
              >I'd prefer an email invation <u>only</u></span
            >
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
              <span
                class="text"
                style="color: {$form.phoneAlerts
                  ? 'var(--color-primary'
                  : 'grey'}">Recieve text-message alerts ?</span
              >
              <ul class="text">
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
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="Sra.">Sra.</option>
                    <option value="Dr.">Dr.</option>
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
                    {...{
                      error: String(!!Object($errors.guests[g])?.firstName)
                    }}
                    on:change={handleChange}
                    bind:value={$form.guests[g].firstName}
                  />
                  <label for={`firstName${g}`}>First Name</label>
                  {#if Object($errors.guests[g])?.firstName}
                    <span id="error">First name is required</span>
                  {/if}
                </div>
                <div class="field">
                  <input
                    type="text"
                    name={`guests[${g}].lastName`}
                    id={`lastName${g}`}
                    placeholder="Last Name"
                    {...{
                      error: String(!!Object($errors.guests[g])?.lastName)
                    }}
                    on:change={handleChange}
                    bind:value={$form.guests[g].lastName}
                  />
                  <label for={`lastName${g}`}>Last Name</label>
                  {#if Object($errors.guests[g])?.lastName}
                    <span id="error">Last Name is required</span>
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
                    {...{ error: String(!!Object($errors.guests[g])?.email) }}
                    on:change={handleChange}
                    bind:value={$form.guests[g].email}
                  />
                  <label for="email">Email</label>
                  {#if Object($errors.guests[g])?.email}
                    <span id="error">Valid email is required</span>
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
                    {...{ error: String(!!Object($errors.guests[g])?.phone) }}
                    use:imask={{ mask: '(000) 000-0000', lazy: false }}
                    on:change={handleChange}
                    bind:value={$form.guests[g].phone}
                  />
                  <label for="phone">Phone Number</label>
                  {#if Object($errors.guests[g])?.phone}
                    <span id="error">Phone Number is required</span>
                  {/if}
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
                  <span
                    class="text"
                    style="color: {$form.guests[g].phoneAlerts
                      ? 'var(--color-primary'
                      : 'grey'}">Recieve text-message updates ?</span
                  >
                  <ul class="text">
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
            <h4 class="[ color__primary ]">Who will be attending?</h4>
            <div id="stdRows">
              <div>
                <span
                  >{$form.title}
                  {$form.firstName}
                  {$form.lastName}
                  {$form.suffix}</span
                >
                <div>
                  <div class="buttonGroup">
                    <input
                      type="radio"
                      id="attend1"
                      name="attend"
                      value="Yes"
                      bind:group={$form.saveTheDate}
                    />
                    <label for="attend1">Yes</label>
                    <input
                      type="radio"
                      id="attend2"
                      name="attend"
                      value="Maybe"
                      bind:group={$form.saveTheDate}
                    />
                    <label for="attend2">Unsure</label>
                    <input
                      type="radio"
                      id="attend3"
                      name="attend"
                      value="No"
                      bind:group={$form.saveTheDate}
                    />
                    <label for="attend3">No</label>
                  </div>
                  <span>
                    {#if !!$errors.saveTheDate}
                      Save the date is required
                    {/if}
                  </span>
                </div>
              </div>
              {#each $form.guests as guest, g}
                <div>
                  <span
                    >{guest.title}
                    {guest.firstName}
                    {guest.lastName}
                    {guest.suffix}</span
                  >
                  <div>
                    <div class="buttonGroup">
                      <input
                        type="radio"
                        name={`guests[${g}].attend`}
                        id={`attend${g}1`}
                        value="Yes"
                        bind:group={$form.guests[g].saveTheDate}
                      />
                      <label for={`attend${g}1`}>Yes</label>
                      <input
                        type="radio"
                        name={`guests[${g}].attend`}
                        id={`attend${g}2`}
                        value="Maybe"
                        bind:group={$form.guests[g].saveTheDate}
                      />
                      <label for={`attend${g}2`}>Unsure</label>
                      <input
                        type="radio"
                        name={`guests[${g}].attend`}
                        id={`attend${g}3`}
                        value="No"
                        bind:group={$form.guests[g].saveTheDate}
                      />
                      <label for={`attend${g}3`}>No</label>
                    </div>
                    <span>
                      {#if !!Object($errors.guests[g])?.saveTheDate}
                        Save the date is required
                      {/if}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
            <p class="[ inset ]" style="color: grey">
              <span style="text-decoration: underline">This is not an RSVP</span
              >, it's okay to be unsure. We're guaging attendance and making
              sure you know to mark your calendar. Hope to see you there!
            </p>
          </fieldset>
          {#if $errors.saveTheDate || (Array.isArray($errors.guests) ? $errors.guests : []).some((g) => !!!g.saveTheDate)}
            Please fill out the Save The Date for all guests
          {/if}
          {#if !$isValid && showErrors}
            <div id="errorBox" in:fly={{ duration: 1000 }}>
              <span
                >Please fix the {errorCount} error{errorCount > 1
                  ? 's'
                  : ''}</span
              >
              <button on:click={hideErrorBox}>DISMISS</button>
            </div>
          {/if}
          <div class="grid">
            <input type="submit" />
          </div>
        </div>
      </form>
    {/if}
  </div>
</div>

<style>
  .center {
    width: 100%;
    max-width: 50rem;
    margin: auto;
    background-color: var(--color-paper);
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

  #stdRows {
    display: grid;
    grid-template-rows: 1fr;
    gap: var(--spacing-2);
  }

  #stdRows > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 600px) {
    #stdRows > div {
      display: grid;
      gap: var(--spacing-1);
      align-items: center;
    }
  }

  #errorBox {
    position: fixed;
    padding: var(--spacing-2) var(--spacing-3);
    bottom: var(--spacing-2);
    right: var(--spacing-2);
    width: 100vw;
    background-color: var(--color-error);
    color: white;
    z-index: 5;
    max-width: 350px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 5px -1px,
      rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px;
  }
  #errorBox > button {
    background-color: inherit;
    color: white;
    border-radius: var(--spacing-1);
    border: 1px solid white;
    border-radius: 8px;
    padding: var(--spacing-1) var(--spacing-2);
  }

  #errorBox > button:hover {
    background-color: var(--color-error-dark);
  }

  .approve {
    display: grid;
    grid-template-columns: 1fr;
    place-content: center;
    text-align: center;
    gap: var(--spacing-6);
    letter-spacing: 0.09rem;
  }

  .approve > div {
    display: grid;
    place-content: center;
    gap: var(--spacing-1);
  }

  .approve img {
    margin: auto;
  }

  #looksGood {
    width: fit-content;
    margin: auto;
    background-color: var(--color-primary);
    color: white;
    padding: var(--spacing-2) var(--spacing-5);
    font-size: var(--typography-5);
    border: 1px solid var(--color-primary);
    border-radius: var(--spacing-1);
    cursor: pointer;
  }

  #backEdit {
    width: fit-content;
    background-color: inherit;
    margin: auto;
    color: var(--color-primary);
    font-size: var(--typography-5);
    border: none;
    padding-bottom: var(--spacing-1);
    border-bottom: 2px solid var(--color-primary);
    cursor: pointer;
  }
</style>
