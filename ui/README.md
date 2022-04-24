This UI should display:
- Branding
- Last X# of awards given

Since this is a demo, I want to make it as easy as possible to write. I'm thinking that I will listen for two paths. The POST will take a file and push it into a ring-buffer (push, shift) as binary buffers. The GET will pull the X# of images from the buffer and return as a JSON array of base64 encoded strings.

In the UI, there will be some js that queries the API and replaces the DOM with new elements on change. Assuming there's limited "stutter", this should be pretty simple. If there is stutter on transition, we might need to enqueue/dequeue a carousel.

