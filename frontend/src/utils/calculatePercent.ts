const percent = (rp: string, dp: string) => {
  return Math.round(((parseInt(rp) - parseInt(dp)) / parseInt(rp)) * 100);
};

export default percent;
