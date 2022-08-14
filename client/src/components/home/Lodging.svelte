<script lang="ts">
  import Title from '../Title.svelte';
  import LinkText from '../LinkText.svelte';
</script>

<section id="lodging">
  <div class="box">
    <h5 style="color: var(--color-tertiary)">Our picks for the weekend</h5>
    <Title color="var(--color-tertiary)" accentColor="var(--color-primary)"
      ><h1>Lodging</h1></Title
    >
  </div>
  <img
    src="/images/DrippingSpringsMap.png"
    id="map"
    alt="Dripping Springs Map"
  />
  <div class="box">
    <a
      href="https://www.marriott.com/reservation/availabilitySearch.mi?destinationAddress.country=&lengthOfStay=3&fromDate=03%2F23%2F2023&toDate=03%2F26%2F2023&numberOfRooms=1&numberOfAdults=2&guestCountBox=2+Adults+Per+Room&childrenCountBox=0+Children+Per+Room&roomCountBox=1+Rooms&childrenCount=0&childrenAges=&clusterCode=none&corporateCode=&groupCode=&isHwsGroupSearch=true&propertyCode=AUSDI&useRewardsPoints=false&flexibleDateSearch=false&t-start=03%2F23%2F2023&t-end=03%2F26%2F2023&fromDateDefaultFormat=03%2F23%2F2023&toDateDefaultFormat=03%2F26%2F2023&fromToDate_submit=03%2F26%2F2023&fromToDate="
      class="action"
      target="__blank"
      ><LinkText color="var(--color-tertiary)"
        ><span class="title">Mariott Hotel</span></LinkText
      ></a
    >
    <span class="roomRate">Nightly Rate: ~$249</span>
    <p class="text">
      The Mariott Hotel is a brand new installment to downtown Dripping Springs.
      Within our room-block at the Marriott you'll have the option of choosing
      King or Double Queen room options and have access to the on-site ammenties
      such as free WiFi, workout gym, and the pool & hot-tub.
      <!-- <span style="text-decoration: underline"
        >On the night of the wedding a complimentary bus will be shuttling
        guests to and from Camp Lucy.</span
      > -->
    </p>
    <a
      href="https://www.camplucy.com/accommodations/rooms/"
      class="action"
      target="__blank"
    >
      <LinkText color="var(--color-tertiary)"
        ><span class="title">Camp Lucy</span></LinkText
      ></a
    >
    <span class="roomRate">Nightly Rate: ~$599</span>
    <p class="text">
      Camp Lucy is the wonderful location of our wedding on Saturday and guests
      have the option of booking on-site suites if still available. Experience
      luxury accomodations away from Dripping Springs and enjoy the unique
      experiences that Camp Lucy has to offer.
    </p>
    <a
      href="https://www.airbnb.com/s/dripping-springs/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&date_picker_type=calendar&checkin=2023-03-23&checkout=2023-03-26&adults=2&source=structured_search_input_header&search_type=filter_change"
      class="action"
      target="__blank"
      ><LinkText color="var(--color-tertiary)"
        ><span class="title">AirBnB</span></LinkText
      ></a
    >
    <span style="padding: 0px var(--spacing-3) 0 var(--spacing-4) ">&</span>
    <a
      href="https://www.vrbo.com/search/keywords:dripping-springs-texas-united-states-of-america/arrival:2023-03-16/departure:2023-03-19?adultsCount=2&petIncluded=false&filterByTotalPrice=true"
      class="action"
      target="__blank"
      ><LinkText color="var(--color-tertiary)"
        ><span class="title">Vrbo</span></LinkText
      ></a
    >
    <p class="text">
      Dripping Springs is one of the most popular wedding destinations in the
      state, with that there are many home and apartment rental options
      available on both Airbnb and Vrbo.
    </p>
  </div>
</section>

<style>
  section {
    position: relative;
    width: 100vw;
    padding: var(--spacing-6) 0px;
    /* background-color: var(--color-paper); */
  }

  #map {
    display: block;
    width: 100%;
    margin-bottom: var(--spacing-3);
  }
  .box {
    padding: 0px var(--spacing-4);
    width: 100%;
    position: relative;
    display: block;
  }
  .title {
    font-size: var(--typography-3);
    font-family: Futura, sans-serif;
  }

  .roomRate {
    display: block;
    font-size: var(--typography-6);
    margin-top: var(--spacing-1);
  }

  p {
    margin-bottom: var(--spacing-4);
  }
</style>
