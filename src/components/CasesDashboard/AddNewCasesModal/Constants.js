export const fieldConfigs = [
  [
    {
      label: "Case Number",
      name: "case_number",
      type: "text",
      case_className: "col-md-12",
      detail_className: "col-md-12",
      validation: {
        required: true,
        errorMessage: "Case Number is required.",
      },
    },
  ],
  [
    {
      label: "Initiation Date",
      name: "intial_date",
      type: "datetime-local",
      case_className: "col-md-6",
      detail_className: "col-md-12  d-none",
      validation: {
        required: true,
        errorMessage: "Initiation Date is required.",
      },
    },
    {
      label: "Type",
      name: "type",
      type: "Select",
      options: [
        { value: "", label: "Possesion" },
        { value: "Aggravated Assault", label: "Aggravated Assault" },
        {
          value: "Aiding and Abetting / Accessory",
          label: "Aiding and Abetting / Accessory",
        },
        { value: "Arson", label: "Arson" },
        { value: "Assault / Battery", label: "Assault / Battery" },
        { value: "Attempt", label: "Attempt" },
        { value: "Bribery", label: "Bribery" },
        { value: "Burglary", label: "Burglary" },
        { value: "Child Abandonment", label: "Child Abandonment" },
        { value: "Child Abuse", label: "Child Abuse" },
        { value: "Child Pornography", label: "Child Pornography" },
        { value: "Computer Crime", label: "Computer Crime" },
        { value: "Conspiracy", label: "Conspiracy" },
        {
          value: "Credit / Debit Card Fraud",
          label: "Credit / Debit Card Fraud",
        },
        {
          value: "Criminal Contempt of Court",
          label: "Criminal Contempt of Court",
        },
        { value: "Cyberbullying", label: "Cyberbullying" },
        { value: "Disorderly Conduct", label: "Disorderly Conduct" },
        { value: "Disturbing the Peace", label: "Disturbing the Peace" },
        { value: "Domestic Violence", label: "Domestic Violence" },
        {
          value: "Drug Manufacturing and Cultivation",
          label: "Drug Manufacturing and Cultivation",
        },
        { value: "Drug Possession", label: "Drug Possession" },
        {
          value: "Drug Trafficking / Distribution",
          label: "Drug Trafficking / Distribution",
        },
        { value: "DUI / DWI", label: "DUI / DWI" },
        { value: "Embezzlement", label: "Embezzlement" },
        { value: "Extortion", label: "Extortion" },
        { value: "Forgery", label: "Forgery" },
        { value: "Fraud", label: "Fraud" },
        { value: "Harassment", label: "Harassment" },
        { value: "Hate Crimes", label: "Hate Crimes" },
        { value: "Homicide", label: "Homicide" },
        { value: "Identity Theft", label: "Identity Theft" },
        { value: "Indecent Exposure", label: "Indecent Exposure" },
        { value: "Insurance Fraud", label: "Insurance Fraud" },
        { value: "Kidnapping", label: "Kidnapping" },
        {
          value: "Manslaughter: Involuntary",
          label: "Manslaughter: Involuntary",
        },
        { value: "Manslaughter: Voluntary", label: "Manslaughter: Voluntary" },
        { value: "Medical Marijuana", label: "Medical Marijuana" },
        {
          value: "MIP: A Minor in Possession",
          label: "MIP: A Minor in Possession",
        },
        { value: "Money Laundering", label: "Money Laundering" },
        { value: "Murder: First-degree", label: "Murder: First-degree" },
        { value: "Murder: Second-degree", label: "Murder: Second-degree" },
        {
          value: "Open Container (of alcohol)",
          label: "Open Container (of alcohol)",
        },
        { value: "Perjury", label: "Perjury" },
        { value: "Probation Violation", label: "Probation Violation" },
        { value: "Prostitution", label: "Prostitution" },
        { value: "Public Intoxication", label: "Public Intoxication" },
        { value: "Pyramid Schemes", label: "Pyramid Schemes" },
        { value: "Racketeering / RICO", label: "Racketeering / RICO" },
        { value: "Rape", label: "Rape" },
        { value: "Robbery", label: "Robbery" },
        { value: "Securities Fraud", label: "Securities Fraud" },
        { value: "Sexual Assault", label: "Sexual Assault" },
        { value: "Shoplifting", label: "Shoplifting" },
        { value: "Solicitation", label: "Solicitation" },
        { value: "Stalking", label: "Stalking" },
        { value: "Statutory Rape", label: "Statutory Rape" },
        { value: "Tax Evasion / Fraud", label: "Tax Evasion / Fraud" },
        { value: "Telemarketing Fraud", label: "Telemarketing Fraud" },
        { value: "Theft", label: "Theft" },
        { value: "Vandalism", label: "Vandalism" },
        { value: "White Collar Crimes", label: "White Collar Crimes" },
        { value: "Wire Fraud", label: "Wire Fraud" },
      ],
      case_className: "col-md-6",
      detail_className: "col-lg-12 we",
      validation: {
        required: true,
        errorMessage: "Type is required.",
      },
    },
  ],
  [
    {
      label: "Tags",
      name: "tags",
      type: "text",
      case_className: "col-md-6",
      detail_className: "col-md-6",
      validation: {
        required: true,
        errorMessage: "Tag is required.",
      },
    },
    {
      label: "Location",
      name: "location",
      type: "Select",
      case_className: "col-md-6",
      detail_className: "col-md-6  ",
      options: [
        { value: "", label: "Location" },
        {
          value: "Admiralty, Sembawang, Yishun",
          label: "Admiralty, Sembawang, Yishun",
        },
        { value: "Admiralty, Woodlands", label: "Admiralty, Woodlands" },
        {
          value: "Ang Mo Kio, Bishan, Thomson",
          label: "Ang Mo Kio, Bishan, Thomson",
        },
        {
          value: "Balestier, Toa Payoh, Moulmein",
          label: "Balestier, Toa Payoh, Moulmein",
        },
        {
          value: "Beach Road, Bencoolen, Bugis, Rochor",
          label: "Beach Road, Bencoolen, Bugis, Rochor",
        },
        {
          value: "Boat Quay, Raffles Place, Marina",
          label: "Boat Quay, Raffles Place, Marina",
        },
        { value: "Changi, Loyang", label: "Changi, Loyang" },
        {
          value: "Chinatown, Tanjong Pagar, Outram",
          label: "Chinatown, Tanjong Pagar, Outram",
        },
        { value: "City Hall, North Bridge", label: "City Hall, North Bridge" },
        {
          value: "Farrer Park, Serangoon, Little India",
          label: "Farrer Park, Serangoon, Little India",
        },
        { value: "Jurong, Boon Lay, Tuas", label: "Jurong, Boon Lay, Tuas" },
        {
          value: "Kovan, Hougang, Punggol, Sengkang",
          label: "Kovan, Hougang, Punggol, Sengkang",
        },
        {
          value: "Kranji, Lim Chu Kang, Tengah",
          label: "Kranji, Lim Chu Kang, Tengah",
        },
        {
          value: "Newton, Novena, Bukit Timah",
          label: "Newton, Novena, Bukit Timah",
        },
        {
          value: "Orchard, River Valley, Cairnhill, Killiney, Leonie Hill",
          label: "Orchard, River Valley, Cairnhill, Killiney, Leonie Hill",
        },
        {
          value: "Paya Lebar, Geylang, Eunos, Kembangan",
          label: "Paya Lebar, Geylang, Eunos, Kembangan",
        },
        {
          value: "Pasir Panjang, West Coast",
          label: "Pasir Panjang, West Coast",
        },
        {
          value: "Pasir Ris, Tampines, Simei",
          label: "Pasir Ris, Tampines, Simei",
        },
        {
          value: "Potong Pasir, Macpherson",
          label: "Potong Pasir, Macpherson",
        },
        {
          value: "Queenstown, Redhill, Tiong Bahru",
          label: "Queenstown, Redhill, Tiong Bahru",
        },
        { value: "Seletar, Yio Chu Kang", label: "Seletar, Yio Chu Kang" },
        { value: "Tagore, Yio Chu Kang", label: "Tagore, Yio Chu Kang" },
        {
          value: "Tanjong Rhu, Katong, Marine Parade, Mountbatten, Siglap",
          label: "Tanjong Rhu, Katong, Marine Parade, Mountbatten, Sigla",
        },
        {
          value: "Tanjong Rhu, Katong, Marine Parade, Mountbatten, Siglap",
          label: "Tanjong Rhu, Katong, Marine Parade, Mountbatten, Siglap",
        },
        {
          value: "Tanglin, Balmoral, Bukit Timah, Holland, River Valley",
          label: "Tanglin, Balmoral, Bukit Timah, Holland, River Valley",
        },
        {
          value: "Telok Blangah, Keppel, Mount Faber, Sentosa",
          label: "Telok Blangah, Keppel, Mount Faber, Sentosa",
        },
        {
          value: "Upper Bukit Timah, Bukit Batok, Choa Chu Kang",
          label: "Upper Bukit Timah, Bukit Batok, Choa Chu Kang",
        },
        {
          value: "Upper Bukit Timah, Clementi",
          label: "Upper Bukit Timah, Clementi",
        },
        {
          value: "Upper East Coast, Bayshore, Bedok, Chai Chee, Tanah Merah ",
          label: "Upper East Coast, Bayshore, Bedok, Chai Chee, Tanah Merah ",
        },
      ],
      validation: {
        required: true,
        errorMessage: "Location is required.",
      },
    },
  ],
];
