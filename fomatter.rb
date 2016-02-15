require 'nokogiri'


Dir.glob('*.html') do |filename|
  html = File.read(filename)
  doc = Nokogiri::HTML(html)
    
  doc.css('a').each do |link_node|
    link_node['href'] = link_node['href'].gsub('https://termsdev.co/stacy', '.') + '.html'
    link_node['href'] = link_node['href'].gsub('..html', 'stacy.html')
  end

  File.write(filename, doc.to_html)
end
