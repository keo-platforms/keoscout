<script>
  const { current_user } = $props()
</script>

<main>
  <section>
    <h2>Dashboard</h2>
    <div class="card">
      <h3>Earnings</h3>
      <p class="text-2xl font-bold">{current_user.earnings} USD</p>
    </div>
    <div class="card">
      <h3>Referrals</h3>
      <p class="text-2xl font-bold">{current_user.referrals_count}</p>
    </div>
    Get more referrals to increase your earnings:<br>
    <a href="https://www.keoscout.com?code={current_user.referral_code}">https://www.keoscout.com?code={current_user.referral_code}</a>
  </section>
</main>

<style>
.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.card h3 {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
}
</style>