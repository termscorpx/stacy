require 'nokogiri'


Dir.glob('*.html') do |filename|
  html = File.read(filename)
  doc = Nokogiri::HTML(html)
    
  doc.css('a').each do |link_node|
    if link_node['href'].start_with?('https://termsdev.co/stacy')
      link_node['href'] = link_node['href'].gsub 'https://termsdev.co/stacy', '.'
      link_node['href'] +='.html' if link_node['href'] =~ /https:\/\/termsdev.co\/stacy\/.*/
    end
    # link_node['href'] = link_node['href'].gsub('..html', 'stacy.html')
  end

  File.write(filename, doc.to_html)
end
