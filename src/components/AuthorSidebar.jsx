function AuthorSidebar({
  name = 'Thompson P.',
  profilePic = '/author-image.jpeg',
  bio = [
    'I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.',
    "When I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.",
  ],
}) {
  return (
    <div className="bg-[#EFEEEB] rounded-3xl p-6">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shrink-0">
          <img
            src={profilePic}
            alt={name}
            className="object-cover w-16 h-16"
          />
        </div>
        <div>
          <p className="text-sm">Author</p>
          <h3 className="text-2xl font-bold">{name}</h3>
        </div>
      </div>

      <hr className="border-gray-300 mb-4" />

      <div className="text-muted-foreground space-y-4">
        {bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default AuthorSidebar
