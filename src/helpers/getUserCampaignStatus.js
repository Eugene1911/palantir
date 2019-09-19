function getUserCampaignStatus(status) {
  switch (status) {
    case 'no_funds':
      return 'no funds';
    case 'unapproved':
      return 'Pending';

    default:
      return status;
  }
}

export default getUserCampaignStatus;
