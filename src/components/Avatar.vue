<template>
  <div class="avatar">
   <!-- <img src="../assets/IMG_2792.jpg" alt="elpandecadadia" /> -->
    <div class="header">
      <a href="https://www.instagram.com/elpandecadadia.es/" target="_blank">
        <img class="insta" src="../assets/instagram.png" alt="insta" />
        <span>
          elpandecadadia.es
        </span>
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.avatar {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
.header {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: center;
  align-items: center;
  color: var(--black);
  a {
    text-decoration: none;
    align-items: center;
    color: var(--black);
    font-weight: bold;
    font-size: 40px;
    height: 100%;
    display: flex;
    font-size: 16px;
  }
  img {
    width: 30px;
    height: 30px;
    margin-right: .5rem;
  }
}

@media (min-width: 500px) {
  .header {
    a {
    font-size: 30px;
    }
  }
  img {
    width: 30px;
    height: 30px;
    margin-right: .5rem;
  }
}

</style>
