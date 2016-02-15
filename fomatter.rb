require 'nokogiri'


Dir.glob('*.html') do |filename|
  doc = Nokogiri::HTML(open(filename))

  doc.css('a').each do |link_node|
    link_node['href'] = link_node['href'].gsub('https://termsdev.co', '.')
  end
end
